import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

import { ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel)
    private readonly reviewModel: ModelType<ReviewModel>,
  ) {}

  async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findByIdAndRemove(id).exec();
  }

  async findByProductId(
    product_id: string,
  ): Promise<DocumentType<ReviewModel>[]> {
    return this.reviewModel
      .find({ productId: Types.ObjectId(product_id) })
      .exec();
  }

  async DeleteByProductId(product_id: string): Promise<void> {
    this.reviewModel.deleteMany({
      productId: Types.ObjectId(product_id),
    });
  }
}
