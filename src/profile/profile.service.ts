import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

import { PatchProfileDto, ProfileDto } from './dto';
import { DEFAULT_AVATAR } from './profile.config';

@Injectable()
export class ProfileService {
  constructor(private databaseService: DatabaseService) {}

  async create(ownerId: number) {
    const profile = await this.databaseService.profile.create({
      data: { ownerId, firstName: '', lastName: '', avatar: DEFAULT_AVATAR },
    });
    return profile;
  }

  async getProfileInfo(ownerId: number): Promise<ProfileDto> {
    const profile = await this.databaseService.profile.findUniqueOrThrow({
      where: { ownerId },
    });
    const user = await this.databaseService.user.findUnique({
      where: { id: ownerId },
      select: {
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return { ...profile, email: user?.email };
  }

  async patchProfileInfo(
    ownerId: number,
    patch: PatchProfileDto,
  ): Promise<ProfileDto> {
    const profile = await this.databaseService.profile.update({
      where: { ownerId },
      data: {
        ...patch,
      },
    });
    const user = await this.databaseService.user.findUnique({
      where: { id: ownerId },
      select: {
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return { ...profile, email: user.email };
  }
}
