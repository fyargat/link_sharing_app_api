import { Module } from '@nestjs/common';
import { LinkModule } from 'src/link/link.module';
import { OrderModule } from 'src/order/order.module';
import { ProfileModule } from 'src/profile/profile.module';

import { SharedInfoController } from './shared-info.controller';
import { SharedInfoService } from './shared-info.service';

@Module({
  imports: [ProfileModule, LinkModule, OrderModule],
  controllers: [SharedInfoController],
  providers: [SharedInfoService],
})
export class SharedInfoModule {}
