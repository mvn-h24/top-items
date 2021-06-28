import { IsString } from 'class-validator';

export class topPageSearchDto {
  @IsString()
  query: string;
}
