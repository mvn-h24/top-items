import { SecondLevelCategory, TopLevelCategory } from '../top-page.model';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MenuCategoryDto {
  @IsEnum(TopLevelCategory)
  firstLevel: TopLevelCategory;

  @IsEnum(SecondLevelCategory)
  secondLevel: SecondLevelCategory;
}

export class PageAdvantageDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

export class hhDataDto {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;
}

export class TopPageCreateDto {
  @IsString()
  alias: string;

  @IsString()
  product_category: string;

  @IsString()
  title: string;

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: Array<string>;

  @Type(() => MenuCategoryDto)
  @ValidateNested()
  menu_category: MenuCategoryDto;

  @Type(() => hhDataDto)
  @IsOptional()
  @ValidateNested()
  hh?: hhDataDto;

  @Type(() => PageAdvantageDto)
  @ValidateNested()
  @IsArray()
  advantages: Array<PageAdvantageDto>;
}
