import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SharingLinkDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  platformId: number;

  @ApiProperty({ example: 'https://github.com/fyargat' })
  @IsString()
  text: string;
}

export class SharingLinkResponseDto {
  @ApiProperty({
    type: SharingLinkDto,
    isArray: true,
    example: {
      data: [],
    },
  })
  data: SharingLinkDto[];
}

export class CreateSharingLinkBodyDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  platformId: number;

  @ApiProperty({ example: 'https://github.com/fyargat' })
  @IsString()
  text: string;
}

export class UpdateSharingLinkBodyDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  platformId: number;

  @ApiProperty({ example: 'https://github.com/fyargat' })
  @IsString()
  @IsOptional()
  text: string;
}
