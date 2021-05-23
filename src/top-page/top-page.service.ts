import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TopPageModel } from './top-page.model';
import { TopPageCreateDto } from './dto/top-page-create.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { Types } from 'mongoose';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel)
    private readonly topPageModel: ModelType<TopPageModel>,
  ) {}

  async create(dto: TopPageCreateDto) {
    return this.topPageModel.create(dto);
  }

  async findById(id: string) {
    return this.topPageModel.findById(id);
  }
  async deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(id);
  }

  async updateById(id: string, dto: TopPageCreateDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async find(dto: FindTopPageDto) {
    return this.topPageModel
      .aggregate([
        { $match: { 'menu_category.firstLevel': dto.firstCategory } },
        { $sort: { _id: 1 } },
      ])
      .exec();
  }
}
