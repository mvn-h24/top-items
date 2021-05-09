import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/CreateReviewDto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!(await this.reviewService.delete(id))) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:id')
  async getByProduct(@Param('id') product_id: string) {
    return this.reviewService.findByProductId(product_id);
  }
}
