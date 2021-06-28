import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductPropsDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}
export class PriceDto {
  @IsNumber()
  current: number;

  @IsNumber()
  @IsOptional()
  old?: number;

  @IsNumber()
  credit: number;
}
