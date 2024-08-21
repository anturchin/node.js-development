import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UserModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SuccessMessage } from '../types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public getUsers(): UserModel[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  public getUserById(@Param('id') id: string): UserModel {
    const user = this.usersService.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto): SuccessMessage {
    this.usersService.create(createUserDto);
    return { message: 'User created!' };
  }

  @Put(':id')
  public updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ): UserModel {
    const user = this.usersService.update(id, updateUser);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Delete(':id')
  public deleteUser(@Param('id') id: string): SuccessMessage {
    const user = this.usersService.delete(id);
    if (!user) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully!' };
  }

  @Put(':id/status')
  public changeStatus(@Param('id') id: string): UserModel {
    const user = this.usersService.changeStatus(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  @Put(':id/role')
  public changeRole(
    @Param('id') id: string,
    @Body() { role }: Pick<UpdateUserDto, 'role'>,
  ): UserModel {
    const user = this.usersService.changeRole(id, role);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
