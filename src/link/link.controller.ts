import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetSessionInfoDto } from 'src/auth/dto';
import { SessionInfo } from 'src/auth/session-info.decorator';

import {
  CreateSharingLinkBodyDto,
  SharingLinkResponseDto,
  UpdateSharingLinkBodyDto,
} from './dto';
import { LinkService } from './link.service';

@Controller('link')
@UseGuards(AuthGuard)
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  @ApiOkResponse({
    type: SharingLinkResponseDto,
  })
  async getList(@SessionInfo() session: GetSessionInfoDto) {
    const response = await this.linkService.getList(session.id);
    return response;
  }

  @Post()
  async createLink(
    @Body() body: CreateSharingLinkBodyDto,
    @SessionInfo() session: GetSessionInfoDto,
  ) {
    const response = await this.linkService.create(session.id, body);
    return response;
  }

  @Patch()
  async updateLink(
    @Body() body: UpdateSharingLinkBodyDto,
    @SessionInfo() session: GetSessionInfoDto,
  ) {
    const response = await this.linkService.updateLink(session.id, body);
    return response;
  }

  @Delete(':id')
  async removeLink(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @SessionInfo()
    session: GetSessionInfoDto,
  ) {
    const response = await this.linkService.removeLink(id, session.id);
    return response;
  }
}
