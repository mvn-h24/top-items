import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { TopPageModel } from './top-page.model';
import { TopPageCreateDto } from './dto/top-page-create.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { topPageSearchDto } from './dto/top-page-search.dto';

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

  async findByCategory(dto: FindTopPageDto) {
    return this.topPageModel
      .aggregate([
        { $match: { 'menu_category.firstLevel': dto.firstCategory } },
        {
          $group: {
            _id: {
              firstLevel: '$menu_category.firstLevel',
            },
            pages: { $push: { title: '$title', alias: '$alias' } },
          },
        },
      ])
      .exec();
  }

  async findAll() {
    return this.topPageModel.find({}).exec();
  }

  async textSearch(dto: topPageSearchDto) {
    return this.topPageModel
      .find({
        $text: { $search: dto.query, $caseSensitive: false },
      })
      .exec();
  }

  async deleteById(id: string) {
    return this.topPageModel.findByIdAndRemove(id).exec();
  }

  async updateById(id: string, dto: TopPageCreateDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
