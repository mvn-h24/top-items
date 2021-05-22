import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ProductModel } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from '../review/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: ModelType<ProductModel>,
  ) {}

  async create(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  findById(id: string) {
    return this.productModel.findById(id);
  }

  async deleteByID(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithSubModels(dto: FindProductDto) {
    return this.productModel
      .aggregate([
        { $match: { categories: dto.category } },
        { $sort: { _id: 1 } },
        { $limit: dto.count },
        {
          $lookup: {
            from: 'Review',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: { $ifNull: ['$reviews', []] } },
            reviewAvg: { $avg: '$reviews.rating' },
          },
        },
      ])
      .exec() as ProductModel & {
      review: Array<ReviewModel>;
      reviewCount;
      reviewAvg;
    };
  }
}
