export class ProductModel {
  image: string;
  title: string;
  price: Price;
  description: string;
  advantages: string;
  disAdvantages: string;
  categories: Array<string>;
  tags: Array<string>;
  calculatedRating: number;
  productProps: {
    [key: string]: string;
  };
}
interface Price {
  current: number;
  old: number;
  credit: number;
}
