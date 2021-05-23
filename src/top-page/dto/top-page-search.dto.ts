import { TopLevelCategory } from '../top-page.model';
import { IsEnum, IsString } from 'class-validator';

export class topPageSearchDto {
  @IsString()
  query: string;
}
