import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

import { PriceDto, ProductPropsDto } from './poduct-parts.dto';

export class CreateProductDto {
  @IsString()
  image: string;

  @IsString()
  title: string;

  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

  @IsString()
  description: string;

  @IsString()
  advantages: string;

  @IsString()
  disAdvantages: string;

  @IsNumber()
  calculatedRating: number;

  @IsArray()
  @IsString({ each: true })
  categories: Array<string>;

  @IsArray()
  @IsString({ each: true })
  tags: Array<string>;

  @Type(() => ProductPropsDto)
  @ValidateNested()
  @IsArray()
  productProps: Array<ProductPropsDto>;
}
