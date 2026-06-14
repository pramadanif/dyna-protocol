import { Injectable } from '@nestjs/common';

@Injectable()
export class StatsService {
  // In a real production app, this would use Prisma to query indexed data
  // For the portfolio showcase, we provide mock stable values that match the UI design
  async getProtocolStats() {
    return {
      tvl: 4204592,
      dynaPrice: 1.42,
      totalStakers: 3142,
      dynaStaked: 1450200,
      lpStaked: 854000,
      timestamp: new Date().toISOString()
    };
  }
}
