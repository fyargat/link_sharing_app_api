import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderModule } from 'src/order/order.module';

import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [DatabaseModule, OrderModule],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [LinkService],
})
export class LinkModule {}
