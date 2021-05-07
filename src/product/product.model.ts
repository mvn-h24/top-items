import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

class ProductProps {
  @prop()
  name: string;
  @prop()
  value: string;
}
class Price {
  @prop()
  current: number;
  @prop()
  old: number;
  @prop()
  credit: number;
}

export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps {
  @prop()
  image: string;

  @prop()
  title: string;

  @prop({ type: () => Price })
  price: Price;

  @prop()
  description: string;

  @prop()
  advantages: string;

  @prop()
  disAdvantages: string;

  @prop({ type: () => [String] })
  categories: Array<string>;

  @prop({ type: () => [String] })
  tags: Array<string>;

  @prop()
  calculatedRating: number;

  @prop({ type: () => [ProductProps], _id: false })
  productProps: Array<ProductProps>;
}
