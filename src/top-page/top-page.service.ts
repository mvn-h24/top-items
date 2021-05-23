import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { TopPageCreateDto } from './dto/top-page-create.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';

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
    return this.topPageModel.findById(id).exec();
  }
  async findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async find(dto: FindTopPageDto) {
    return this.topPageModel
      .aggregate([
        { $match: { 'menu_category.firstLevel': dto.firstCategory } },
        { $sort: { _id: 1 } },
      ])
      .exec();
  }

  async deleteById(id: string) {
    return this.topPageModel.findByIdAndRemove(id).exec();
  }

  async updateById(id: string, dto: TopPageCreateDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
