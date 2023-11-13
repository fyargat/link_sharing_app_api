import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class OrderResponseDto {
  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  data: number[];
}

export class OrderRequestBodyDto {
  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  order: number[];
}
