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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductNotFound } from './product.constants';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { NotValidObjectId } from '../pipes/pipes.constants';

@Controller('product')
export class ProductController {
  constructor(private readonly productServ: ProductService) {}
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productServ.create(dto);
  }

  @Get(':id')
  async getOne(@Param('id', IdValidationPipe) id: string) {
    const prod = await this.productServ.findById(id);
    if (!prod) {
      throw new NotFoundException(ProductNotFound);
    }
    return prod;
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const prod = await this.productServ.deleteByID(id);
    if (!prod) {
      throw new NotFoundException(ProductNotFound);
    }
    return prod;
  }

  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: ProductModel,
  ) {
    const prod = await this.productServ.updateById(id, dto);
    if (!prod) {
      throw new NotFoundException(ProductNotFound);
    }
    return prod;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return this.productServ.findWithSubModels(dto);
  }
}
