require('dotenv').config();
const { MONGODB_URI } = process.env;
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProductModule, MongooseModule.forRoot(MONGODB_URI), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
