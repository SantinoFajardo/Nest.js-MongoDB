import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUser } from './dto/user.dto';
import { USER } from './interfaces/user.interface';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(body: CreateUser): Promise<USER> {
    const response: any = new this.userModel(body);
    return await response.save();
  }

  async getUsers(): Promise<USER[]> {
    const response: USER[] = await this.userModel.find();
    return response;
  }
}
