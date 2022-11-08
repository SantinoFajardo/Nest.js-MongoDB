import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/products.schema';
import { CreateProduct, UpdatedProduct } from './dto/product.dto';
import { PRODUCT } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getProducts(): Promise<PRODUCT[]> {
    const products: PRODUCT[] = await this.productModel.find();
    return products;
  }

  async getProduct(id: ObjectId): Promise<PRODUCT> {
    const product: PRODUCT = await this.productModel.findById(id);
    return product;
  }

  async createProduct(body: CreateProduct): Promise<PRODUCT> {
    const createdProduct: any = new this.productModel(body);
    await createdProduct.save();
    return createdProduct;
  }

  async deleteProduct(
    id: ObjectId,
  ): Promise<{ msg: string; deletedProduct: PRODUCT }> {
    const response: PRODUCT = await this.productModel.findByIdAndDelete(id);
    return {
      msg: 'Deleted',
      deletedProduct: response,
    };
  }

  async updatedProduct(
    id: ObjectId,
    body: UpdatedProduct,
  ): Promise<{ msg: string; updatedProduct: PRODUCT }> {
    const updatedProduct: PRODUCT = await this.productModel.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );
    return {
      msg: 'Updated',
      updatedProduct: updatedProduct,
    };
  }
}
