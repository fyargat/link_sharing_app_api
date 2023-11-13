import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderModule } from 'src/order/order.module';
import { ProfileModule } from 'src/profile/profile.module';

import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, ProfileModule, OrderModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
