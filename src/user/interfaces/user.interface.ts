import { ObjectId } from 'mongoose';

export type USER = {
  _id?: ObjectId;
  fullName: string;
  mail: string;
  age: number;
};
