import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { ErrorUser, User } from './users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public getUsers(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  public getUserById(@Param('id') id: string): User | ErrorUser {
    const user = this.usersService.findById(id);
    if (!user) return { message: 'User not found' };
    return user;
  }

  @Post()
  @HttpCode(204)
  public createUser(@Body() createUserDto: CreateUserDto): void {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  public updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ): User | ErrorUser {
    const user = this.usersService.update(id, updateUser);
    if (!user) return { message: 'User not found' };
    return user;
  }

  @Delete(':id')
  public deleteUser(@Param('id') id: string): User | ErrorUser {
    const user = this.usersService.delete(id);
    if (!user) return { message: 'User not found' };
    return user;
  }

  @Put(':id/status')
  public changeStatus(@Param('id') id: string): User | ErrorUser {
    const user = this.usersService.changeStatus(id);
    if (!user) return { message: 'User not found' };
    return user;
  }
  @Put(':id/role')
  public changeRole(
    @Param('id') id: string,
    @Body() { role }: Pick<UpdateUserDto, 'role'>,
  ): User | ErrorUser {
    const user = this.usersService.changeRole(id, role);
    if (!user) return { message: 'User not found' };
    return user;
  }
}
