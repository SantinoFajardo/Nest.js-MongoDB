import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUser } from './dto/user.dto';
import { USER } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {} //servicio instanciado

  @Post()
  async createUser(
    @Body() body: CreateUser,
    @Res() res: Response,
  ): Promise<USER | Response<any, Record<string, any>>> {
    const user: USER = await this.UserService.createUser(body);
    return res.status(HttpStatus.OK).json(user);
  }

  @Get()
  async getUsers(
    @Res() res: Response,
  ): Promise<USER[] | Response<any, Record<string, any>>> {
    const response = await this.UserService.getUsers();
    return res.status(HttpStatus.OK).json(response);
  }
}
