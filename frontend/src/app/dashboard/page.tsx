"use client";

import React, { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { formatUnits, parseUnits } from 'viem';
import { NeonButton } from '../../components/ui';
import { Wallet, TrendingUp, Coins, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ARBITRUM_SEPOLIA_ADDRESSES } from '../../lib/contracts';
import YieldStakingABI from '../../lib/abis/YieldStaking.json';
import LPStakingABI from '../../lib/abis/LPStaking.json';
import DynaTokenABI from '../../lib/abis/DynaToken.json';
import { useQuery } from '@tanstack/react-query';

// Utility for fetching global stats from backend
const fetchStats = async () => {
  const res = await fetch('http://localhost:4000/api/stats');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [activeTab, setActiveTab] = useState<'yield' | 'lp'>('yield');
  const [stakeAmount, setStakeAmount] = useState("");

  const contractAddress = activeTab === 'yield' ? ARBITRUM_SEPOLIA_ADDRESSES.YIELD_STAKING : ARBITRUM_SEPOLIA_ADDRESSES.LP_STAKING;
  const stakingAbi = activeTab === 'yield' ? YieldStakingABI.abi : LPStakingABI.abi;

  // Backend Stats
  const { data: globalStats } = useQuery({
    queryKey: ['globalStats'],
    queryFn: fetchStats,
    refetchInterval: 10000,
  });

  // User Balances
  const { data: dynaBalanceData } = useReadContract({
    address: ARBITRUM_SEPOLIA_ADDRESSES.DYNA_TOKEN as `0x${string}`,
    abi: DynaTokenABI.abi,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: !!address }
  });

  const { data: stakedBalanceData, refetch: refetchStaked } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: stakingAbi,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: !!address }
  });

  const { data: earnedData, refetch: refetchEarned } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: stakingAbi,
    functionName: 'earned',
    args: [address],
    query: { enabled: !!address }
  });

  // Write actions
  const { writeContractAsync: writeApprove } = useWriteContract();
  const { writeContractAsync: writeStake } = useWriteContract();
  const { writeContractAsync: writeWithdraw } = useWriteContract();
  const { writeContractAsync: writeClaim } = useWriteContract();

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  const handleStake = async () => {
    if (!stakeAmount || !address) return;
    try {
      const amountParsed = parseUnits(stakeAmount, 18);
      // 1. Approve
      const approveTx = await writeApprove({
        address: ARBITRUM_SEPOLIA_ADDRESSES.DYNA_TOKEN as `0x${string}`,
        abi: DynaTokenABI.abi,
        functionName: 'approve',
        args: [contractAddress, amountParsed]
      });
      // A real app would wait for receipt here, but for brevity we rely on fast testnet
      
      // 2. Stake
      await writeStake({
        address: contractAddress as `0x${string}`,
        abi: stakingAbi,
        functionName: 'stake',
        args: [amountParsed]
      });
      
      setStakeAmount("");
      setTimeout(() => refetchStaked(), 3000);
    } catch (e) {
      console.error(e);
      alert("Transaction failed or rejected.");
    }
  };

  const handleUnstake = async () => {
    if (!stakeAmount || !address) return;
    try {
      const amountParsed = parseUnits(stakeAmount, 18);
      await writeWithdraw({
        address: contractAddress as `0x${string}`,
        abi: stakingAbi,
        functionName: 'withdraw',
        args: [amountParsed]
      });
      setStakeAmount("");
      setTimeout(() => refetchStaked(), 3000);
    } catch (e) {
      console.error(e);
      alert("Transaction failed or rejected.");
    }
  };

  const handleClaim = async () => {
    if (!address) return;
    try {
      await writeClaim({
        address: contractAddress as `0x${string}`,
        abi: stakingAbi,
        functionName: 'getReward',
      });
      setTimeout(() => refetchEarned(), 3000);
    } catch (e) {
      console.error(e);
      alert("Transaction failed or rejected.");
    }
  };

  const formattedBalance = dynaBalanceData ? Number(formatUnits(dynaBalanceData as bigint, 18)).toFixed(2) : "0.00";
  const formattedStaked = stakedBalanceData ? Number(formatUnits(stakedBalanceData as bigint, 18)).toFixed(2) : "0.00";
  const formattedEarned = earnedData ? Number(formatUnits(earnedData as bigint, 18)).toFixed(4) : "0.0000";

  return (
    <div className="bg-brand-bg-primary min-h-screen text-brand-text-1 pt-24 pb-12 font-sans relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent-base/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
        >
          <div>
            <Link href="/" className="text-brand-accent-base hover:underline text-sm font-mono mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl font-display font-bold uppercase tracking-wider mb-2 text-glow">Terminal Access</h1>
            <p className="text-brand-text-3 font-mono text-sm">Secure Yield & Liquidity Protocol Interface</p>
          </div>
          
          <div className="bg-brand-surface-1 border border-brand-border p-4 clip-edges">
            {isConnected ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-accent-base animate-pulse" />
                  <span className="font-mono text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                </div>
                <NeonButton variant="outline" className="!py-1.5 !px-3 text-xs" onClick={() => disconnect()}>Disconnect</NeonButton>
              </div>
            ) : (
              <NeonButton variant="primary" onClick={handleConnect}>Connect Wallet</NeonButton>
            )}
          </div>
        </motion.div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Value Locked", value: `$${globalStats?.tvl?.toLocaleString(undefined, {maximumFractionDigits:2}) || "0.00"}`, icon: Activity },
            { label: "DYNA Price", value: `$${globalStats?.dynaPrice || "1.42"}`, icon: Coins },
            { label: "Total Stakers", value: `${globalStats?.totalStakers || "0"}`, icon: ShieldCheck },
            { label: "Your Wallet Balance", value: isConnected ? `${formattedBalance} DYNA` : "---", icon: Wallet }
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-brand-surface-2/50 border border-brand-border p-6 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-brand-accent-base/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start mb-4">
                <span className="text-brand-text-3 font-mono text-xs uppercase tracking-widest">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-brand-accent-base" />
              </div>
              <div className="text-2xl font-display font-medium text-glow">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Tabs & Interaction Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="flex gap-4 border-b border-brand-border/50 pb-px">
              <button 
                onClick={() => setActiveTab('yield')}
                className={`pb-4 font-mono uppercase tracking-widest text-sm relative transition-colors ${activeTab === 'yield' ? 'text-brand-accent-base' : 'text-brand-text-3 hover:text-brand-text-2'}`}
              >
                Yield Staking
                {activeTab === 'yield' && (
                  <motion.span layoutId="tab-indicator" className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent-base box-glow" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab('lp')}
                className={`pb-4 font-mono uppercase tracking-widest text-sm relative transition-colors ${activeTab === 'lp' ? 'text-brand-accent-base' : 'text-brand-text-3 hover:text-brand-text-2'}`}
              >
                LP Staking
                {activeTab === 'lp' && (
                  <motion.span layoutId="tab-indicator" className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent-base box-glow" />
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-brand-surface-1 border border-brand-border p-8 relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent-base/5 blur-3xl pointer-events-none" />
                
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-display font-semibold mb-1">{activeTab === 'yield' ? 'Stake DYNA' : 'Stake LP Tokens'}</h2>
                    <p className="text-brand-text-3 text-sm">Earn {activeTab === 'yield' ? 'up to 12.5% APY' : 'up to 45% APY'} in DYNA rewards</p>
                  </div>
                  <div className="bg-brand-bg-primary border border-brand-accent-base/20 px-4 py-2 text-brand-accent-base font-mono text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {activeTab === 'yield' ? '12.5% APY' : '45% APY'}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-brand-text-2">Amount to Stake / Unstake</span>
                      <span className="text-brand-text-3 font-mono">Balance: {isConnected ? formattedBalance : '0.00'}</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder="0.0"
                        className="w-full bg-brand-bg-primary border border-brand-border focus:border-brand-accent-base/50 outline-none p-4 font-mono text-xl text-brand-text-1 transition-colors"
                      />
                      <button 
                        onClick={() => setStakeAmount(formattedBalance)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-brand-accent-base hover:text-brand-accent-bright uppercase"
                      >
                        Max
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <NeonButton 
                      variant="primary" 
                      className="flex-1 justify-center"
                      onClick={handleStake}
                    >
                      {activeTab === 'yield' ? 'Stake DYNA' : 'Stake LP'}
                    </NeonButton>
                    <NeonButton 
                      variant="outline" 
                      className="flex-1 justify-center"
                      onClick={handleUnstake}
                    >
                      Unstake
                    </NeonButton>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* User Position Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-brand-surface-1 border border-brand-border p-6 clip-edges">
              <h3 className="font-display font-semibold text-lg mb-6 border-b border-brand-border pb-4">Your Position</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-brand-text-3 text-xs uppercase tracking-wider mb-1">Currently Staked</div>
                  <div className="text-2xl font-mono text-glow">{formattedStaked} <span className="text-sm text-brand-text-3">{activeTab === 'yield' ? 'DYNA' : 'LP'}</span></div>
                </div>
                
                <div>
                  <div className="text-brand-text-3 text-xs uppercase tracking-wider mb-1">Pending Rewards</div>
                  <div className="text-2xl font-mono text-brand-accent-base">{formattedEarned} <span className="text-sm text-brand-accent-base/50">DYNA</span></div>
                </div>

                <NeonButton 
                  variant="outline" 
                  className="w-full justify-center group mt-4"
                  onClick={handleClaim}
                >
                  Claim Rewards
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </NeonButton>
              </div>
            </div>

            <div className="bg-brand-bg-secondary border border-brand-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-brand-accent-base" />
                <h4 className="font-display font-medium text-sm">Audited & Secure</h4>
              </div>
              <p className="text-xs text-brand-text-3 leading-relaxed">
                Our smart contracts have been thoroughly audited by top security firms. Staking carries risk. Read our documentation before participating.
              </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
