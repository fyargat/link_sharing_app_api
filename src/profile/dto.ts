import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'test@test.test' })
  @IsString()
  email: string;
}

export class PatchProfileDto {
  @ApiProperty({ example: 'John' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'avatar-url' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  avatar?: string;
}
