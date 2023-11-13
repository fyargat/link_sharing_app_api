import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { LinkModule } from './link/link.module';
import { OrderModule } from './order/order.module';
import { ProfileModule } from './profile/profile.module';
import { SharedInfoModule } from './shared-info/shared-info.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    ProfileModule,
    LinkModule,
    OrderModule,
    SharedInfoModule,
  ],
})
export class AppModule {}
