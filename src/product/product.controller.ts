import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';

@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body() dto: Omit<ProductModel, '_id'>) {
    return null;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return null;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return null;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {
    return null;
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {
    return null;
  }
}
