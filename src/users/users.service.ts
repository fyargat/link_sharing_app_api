import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UsersService {
  constructor(
    private databaseService: DatabaseService,
    private profileService: ProfileService,
  ) {}

  findByEmail(email: string) {
    return this.databaseService.user.findFirst({ where: { email } });
  }

  async create(email: string, hash: string, salt: string) {
    const user = await this.databaseService.user.create({
      data: {
        email,
        hash,
        salt,
      },
    });
    await this.profileService.create(user.id);

    return user;
  }
}
