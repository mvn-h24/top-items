import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export enum TopLevelCategory {
  courses,
  services,
  books,
  products,
}
export enum SecondLevelCategory {
  courses,
  services,
  books,
  products,
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
export class TopPageModel {
  @prop()
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
  @prop({ type: () => [String], _id: false })
  tags: Array<string>;
}
