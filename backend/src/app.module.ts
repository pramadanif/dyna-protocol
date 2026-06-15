import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatsModule } from './stats/stats.module';
import { IndexerModule } from './indexer/indexer.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, StatsModule, IndexerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
