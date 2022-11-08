import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
import { CreateProduct, UpdatedProduct } from './dto/product.dto';
import { PRODUCT } from './interfaces/product.interface';
import { ProductService } from './product.service';
import { Product } from './schemas/products.schema';

@Controller('product')
export class ProductController {
  constructor(private ProductService: ProductService) {} //servicio instanciado

  @Post('/create')
  async createPost(
    @Res() res: Response,
    @Body() body: CreateProduct,
  ): Promise<PRODUCT | Response<any, Record<string, any>>> {
    const product: PRODUCT = await this.ProductService.createProduct(body);
    return res.status(HttpStatus.OK).json(product);
  }

  @Get()
  async getProducts(
    @Res() res: Response,
  ): Promise<PRODUCT[] | Response<any, Record<string, any>>> {
    const response: PRODUCT[] = await this.ProductService.getProducts();
    if (!response) {
      throw new NotFoundException('Not exist products');
    }
    return res.status(HttpStatus.OK).json(response);
  }

  @Get(':id')
  async getProduct(
    @Param('id') id: ObjectId,
    @Res() res: Response,
  ): Promise<PRODUCT | Response<any, Record<string, any>>> {
    const response: PRODUCT = await this.ProductService.getProduct(id);
    if (!response) {
      throw new NotFoundException('Not exist product');
    }
    return res.status(HttpStatus.OK).json(response);
  }

  @Delete()
  async deleteProduct(
    @Query('productId') id: ObjectId,
    @Res() res: Response,
  ): Promise<
    | { msg: string; deletedProduct: PRODUCT }
    | Response<any, Record<string, any>>
  > {
    const response: { msg: string; deletedProduct: PRODUCT } =
      await this.ProductService.deleteProduct(id);
    if (!response) {
      throw new NotFoundException('Not exist product');
    }
    return res.status(HttpStatus.OK).json(response);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: ObjectId,
    @Body() body: UpdatedProduct,
    @Res() res: Response,
  ): Promise<
    | { msg: string; updatedProduct: PRODUCT }
    | Response<any, Record<string, any>>
  > {
    const response = await this.ProductService.updatedProduct(id, body);
    return res.status(HttpStatus.OK).json(response);
  }
}
