import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { TelegramService } from '@telegram/telegram.service';

import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_CREATED, REVIEW_NOT_FOUND } from './review.constants';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly reviewService: ReviewService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    await this.notify(REVIEW_CREATED);
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

  @Post('notify')
  async notify(@Body() mess: string) {
    await this.telegramService.sendMessage(mess);
  }
}
