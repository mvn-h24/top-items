import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageCreateDto } from './dto/top-page-create.dto';
import { TopPageService } from './top-page.service';
import { PageNotFound } from './top-page.constants';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageRepo: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: TopPageCreateDto) {
    return this.topPageRepo.create(dto);
  }

  @Get(':id')
  async getOneById(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageRepo.findById(id);
    if (!page) {
      throw new NotFoundException(PageNotFound);
    }
    return page;
  }
  @Get('alias/:alias')
  async getOneByAlias(@Param('alias') alias: string) {
    const page = await this.topPageRepo.findByAlias(alias);
    if (!page) {
      throw new NotFoundException(PageNotFound);
    }
    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageRepo.deleteById(id);
    if (!page) {
      throw new NotFoundException(PageNotFound);
    }
    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: TopPageModel,
  ) {
    const page = await this.topPageRepo.updateById(id, dto);
    if (!page) {
      throw new NotFoundException(PageNotFound);
    }
    return page;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageRepo.find(dto);
  }
}
