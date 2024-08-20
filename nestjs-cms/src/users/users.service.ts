import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Role, User } from './users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: '1', name: 'ann', isActive: true, role: Role.Admin },
    { id: '2', name: 'zik', isActive: true, role: Role.User },
    { id: '3', name: 'bek', isActive: false, role: Role.User },
  ];

  public findAll(): User[] {
    return this.users;
  }

  public findById(id: string): User | null {
    return this.users.find((user) => user.id === id) || null;
  }

  public create(createUser: CreateUserDto): void {
    this.users.push({ id: uuidv4(), ...createUser, isActive: true });
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

  public changeStatus(id: string): User | null {
    const user = this.findById(id);
    if (!user) return null;
    user.isActive = !user.isActive;
    return user;
  }

  public changeRole(id: string, role: Role): User | null {
    const user = this.findById(id);
    if (!user) return null;
    user.role = role;
    return user;
  }
}
