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
interface MenuCategory {
  firstLevel: TopLevelCategory;
  secondLevel: SecondLevelCategory;
}
interface hhService {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
}
interface PageAdvantage {
  name: string;
  description: string;
}

export class TopPageModel {
  _id: number;
  menu_category: MenuCategory;
  product_category: string;
  title: string;
  seoText: string;
  hh?: hhService;
  advantages: Array<PageAdvantage>;
  tagsTitle: string;
  tags: Array<string>;
}
