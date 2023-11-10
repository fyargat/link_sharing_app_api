import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetSessionInfoDto } from 'src/auth/dto';
import { SessionInfo } from 'src/auth/session-info.decorator';

import { PatchProfileDto, ProfileDto } from './dto';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOkResponse({
    type: ProfileDto,
  })
  getProfileInfo(
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<ProfileDto> {
    return this.profileService.getProfileInfo(session.id);
  }

  @Patch()
  @ApiOkResponse({
    type: ProfileDto,
  })
  patchProfileInfo(
    @Body() body: PatchProfileDto,
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<ProfileDto> {
    return this.profileService.patchProfileInfo(session.id, body);
  }
}
