import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

import { PatchProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private databaseService: DatabaseService) {}

  async create(ownerId: number) {
    const profile = await this.databaseService.profile.create({
      data: { ownerId, firstName: '', lastName: '' },
    });
    return profile;
  }

  async getProfileInfo(ownerId: number) {
    const profile = await this.databaseService.profile.findUniqueOrThrow({
      where: { ownerId },
    });

    return profile;
  }

  async patchProfileInfo(ownerId: number, patch: PatchProfileDto) {
    const profile = await this.databaseService.profile.update({
      where: { ownerId },
      data: {
        ...patch,
      },
    });

    return profile;
  }
}
