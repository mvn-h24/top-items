import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { index, prop } from '@typegoose/typegoose';

export enum TopLevelCategory {
  courses = 0,
  services = 1,
  books = 2,
  products = 3,
}
export enum SecondLevelCategory {
  courses = 0,
  services = 1,
  books = 2,
  products = 3,
}
export class MenuCategory {
  @prop({ enum: TopLevelCategory, type: () => Number })
  firstLevel: TopLevelCategory;
  @prop({ enum: SecondLevelCategory, type: () => Number })
  secondLevel: SecondLevelCategory;
}
export class hhData {
  @prop()
  count: number;
  @prop()
  juniorSalary: number;
  @prop()
  middleSalary: number;
  @prop()
  seniorSalary: number;
}
export class PageAdvantage {
  @prop()
  name: string;
  @prop()
  description: string;
}

export interface TopPageModel extends Base {}

@index({ title: 'text', seoText: 'text' })
export class TopPageModel extends TimeStamps {
  @prop({ unique: true })
  alias: string;
  @prop()
  product_category: string;
  @prop()
  title: string;
  @prop()
  seoText: string;
  @prop()
  tagsTitle: string;

  @prop({ type: () => MenuCategory })
  menu_category: MenuCategory;
  @prop({ type: () => hhData })
  hh?: hhData;
  @prop({ type: () => [PageAdvantage], _id: false })
  advantages: Array<PageAdvantage>;
  @prop({ type: () => [String] })
  tags: Array<string>;
}
