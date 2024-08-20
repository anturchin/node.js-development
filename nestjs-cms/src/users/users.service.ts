import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { User } from './users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: '1', name: 'ann' },
    { id: '2', name: 'zik' },
    { id: '3', name: 'bek' },
  ];

  public findAll(): User[] {
    return this.users;
  }

  public findById(id: string): User | null {
    return this.users.find((user) => user.id === id) || null;
  }

  public create(user: CreateUserDto): void {
    this.users.push({ id: uuidv4(), name: user.name });
  }

  public update(id: string, updateUser: UpdateUserDto): User | null {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...updateUser };
    return this.users[index];
  }

  public delete(id: string): User | null {
    const user = this.findById(id);
    if (!user) return null;
    this.users = this.users.filter((user) => user.id === id);
    return user;
  }
}
