import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name);

  constructor(private prisma: PrismaService) {}

  async getProtocolStats() {
    try {
      const stats = await this.prisma.protocolStats.findUnique({
        where: { id: 'global' }
      });
      
      if (stats) {
        return {
          tvl: stats.tvl,
          dynaPrice: stats.dynaPrice,
          totalStakers: stats.totalStakers,
          dynaStaked: stats.dynaStaked,
          lpStaked: stats.lpStaked,
          timestamp: stats.updatedAt
        };
      }
    } catch (e) {
      this.logger.error('Error fetching stats', e);
    }
    
    // Fallback if DB empty
    return {
      tvl: 0,
      dynaPrice: 1.42,
      totalStakers: 0,
      dynaStaked: 0,
      lpStaked: 0,
      timestamp: new Date().toISOString()
    };
  }
}
