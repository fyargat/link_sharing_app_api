import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { SharedInfoService } from './shared-info.service';

@Controller('shared-info')
export class SharedInfoController {
  constructor(private readonly sharedInfoService: SharedInfoService) {}

  @Get(':id')
  @ApiOkResponse({})
  getSharedInfo(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    console.log('id', id);

    return this.sharedInfoService.getSharedInfo(id);
  }
}
