import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createPublicClient, http, parseAbiItem } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import * as YieldStakingABI from '../abis/YieldStaking.json';
import * as LPStakingABI from '../abis/LPStaking.json';

const YIELD_STAKING_ADDRESS = '0x672Bb92cF864750DD3683a22b1EaA71f67808AcC';
const LP_STAKING_ADDRESS = '0x83402275A78ae1ca7bb0ef26cFFDF6C5E05F2978';

@Injectable()
export class IndexerService implements OnModuleInit {
  private readonly logger = new Logger(IndexerService.name);
  private publicClient;

  constructor(private prisma: PrismaService) {
    this.publicClient = createPublicClient({
      chain: arbitrumSepolia,
      transport: http()
    });
  }

  async onModuleInit() {
    this.logger.log('Initializing blockchain indexer service on Arbitrum Sepolia...');
    this.startListening();
  }

  private async startListening() {
    this.logger.log('Starting polling for Staked and Withdrawn events on YieldStaking and LPStaking...');

    const stakedEventAbi = parseAbiItem('event Staked(address indexed user, uint256 amount)');
    const withdrawnEventAbi = parseAbiItem('event Withdrawn(address indexed user, uint256 amount)');

    let lastBlock = await this.publicClient.getBlockNumber();
    lastBlock = lastBlock > 1000n ? lastBlock - 1000n : 0n;

    setInterval(async () => {
      try {
        const currentBlock = await this.publicClient.getBlockNumber();
        if (currentBlock <= lastBlock) return;

        const fetchLogs = async (address: `0x${string}`, eventAbi: any, type: string, handler: any) => {
          const logs = await this.publicClient.getLogs({
            address,
            event: eventAbi,
            fromBlock: lastBlock + 1n,
            toBlock: currentBlock
          });
          logs.forEach((log: any) => handler(log.args.user, log.args.amount, type, log.transactionHash));
        };

        await fetchLogs(YIELD_STAKING_ADDRESS, stakedEventAbi, 'YIELD', this.handleStakeEvent.bind(this));
        await fetchLogs(YIELD_STAKING_ADDRESS, withdrawnEventAbi, 'YIELD', this.handleWithdrawEvent.bind(this));
        await fetchLogs(LP_STAKING_ADDRESS, stakedEventAbi, 'LP', this.handleStakeEvent.bind(this));
        await fetchLogs(LP_STAKING_ADDRESS, withdrawnEventAbi, 'LP', this.handleWithdrawEvent.bind(this));

        lastBlock = currentBlock;
      } catch (e) {
        this.logger.error('Error fetching logs', e);
      }
    }, 5000); // Poll every 5 seconds
  }

  private async handleStakeEvent(userAddress: string | undefined, amount: bigint | undefined, poolType: string, txHash: string | undefined) {
    if (!userAddress || !amount || !txHash) return;
    
    const formattedAmount = Number(amount) / 1e18;
    this.logger.log(`New Stake Event Indexed: User ${userAddress.slice(0, 8)} staked ${formattedAmount} on ${poolType}`);
    
    try {
      await this.prisma.stakeEvent.upsert({
        where: { transactionHash: txHash },
        update: {},
        create: {
          userAddress,
          amount: formattedAmount,
          poolType,
          transactionHash: txHash,
        }
      });
      this.updateGlobalStats();
    } catch (e) {
      this.logger.error('Failed to save stake event', e);
    }
  }

  private async handleWithdrawEvent(userAddress: string | undefined, amount: bigint | undefined, poolType: string, txHash: string | undefined) {
    if (!userAddress || !amount || !txHash) return;
    
    const formattedAmount = Number(amount) / 1e18;
    this.logger.log(`New Withdraw Event Indexed: User ${userAddress.slice(0, 8)} withdrew ${formattedAmount} on ${poolType}`);
    
    try {
      // For simplicity, we record a withdrawal as a negative stake
      await this.prisma.stakeEvent.upsert({
        where: { transactionHash: txHash },
        update: {},
        create: {
          userAddress,
          amount: -formattedAmount,
          poolType,
          transactionHash: txHash,
        }
      });
      this.updateGlobalStats();
    } catch (e) {
      this.logger.error('Failed to save withdraw event', e);
    }
  }

  private async updateGlobalStats() {
    // Recalculate TVL
    const allEvents = await this.prisma.stakeEvent.findMany();
    
    let yieldStaked = 0;
    let lpStaked = 0;
    const uniqueStakers = new Set<string>();

    allEvents.forEach(e => {
      if (e.poolType === 'YIELD') yieldStaked += e.amount;
      if (e.poolType === 'LP') lpStaked += e.amount;
      if (e.amount > 0) uniqueStakers.add(e.userAddress);
    });

    // Mock price for portfolio
    const dynaPrice = 1.42; 
    const tvl = (yieldStaked + lpStaked) * dynaPrice;

    // We assume ID 'global' for our single row
    await this.prisma.protocolStats.upsert({
      where: { id: 'global' },
      update: {
        tvl,
        dynaPrice,
        totalStakers: uniqueStakers.size,
        dynaStaked: yieldStaked,
        lpStaked
      },
      create: {
        id: 'global',
        tvl,
        dynaPrice,
        totalStakers: uniqueStakers.size,
        dynaStaked: yieldStaked,
        lpStaked
      }
    });
  }
}
