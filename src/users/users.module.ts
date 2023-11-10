import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProfileModule } from 'src/profile/profile.module';

import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, ProfileModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
