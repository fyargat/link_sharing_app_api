import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetSessionInfoDto } from 'src/auth/dto';
import { SessionInfo } from 'src/auth/session-info.decorator';

import { OrderRequestBodyDto, OrderResponseDto } from './dto';
import { OrderService } from './order.service';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOkResponse({
    type: OrderResponseDto,
  })
  async getOrder(@SessionInfo() session: GetSessionInfoDto) {
    const response = await this.orderService.getOrder(session.id);
    return response;
  }

  @Post()
  async updateOrder(
    @Body() body: OrderRequestBodyDto,
    @SessionInfo() session: GetSessionInfoDto,
  ) {
    const response = await this.orderService.updateOrder(
      session.id,
      body.order,
    );
    return response;
  }
}
