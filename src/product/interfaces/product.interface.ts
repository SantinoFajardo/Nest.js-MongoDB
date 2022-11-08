import { ObjectId } from 'mongoose';

export type PRODUCT = {
  _id?: ObjectId;
  name: string;
  description: string;
  price: string;
};
