import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Role, UserModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: UserModel[] = [
    { id: '1', name: 'ann', isActive: true, role: Role.Admin },
    { id: '2', name: 'zik', isActive: true, role: Role.User },
    { id: '3', name: 'bek', isActive: false, role: Role.User },
  ];

  public findAll(): UserModel[] {
    return this.users;
  }

  public findById(id: string): UserModel | null {
    return this.users.find((user) => user.id === id) || null;
  }

  public create(createUser: CreateUserDto): void {
    this.users.push({ id: uuidv4(), ...createUser, isActive: true });
  }

  public update(id: string, updateUser: UpdateUserDto): UserModel | null {
    if (this.findIndex(id) === -1) return null;
    this.users[this.findIndex(id)] = {
      ...this.users[this.findIndex(id)],
      ...updateUser,
    };
    return this.users[this.findIndex(id)];
  }

  public delete(id: string): boolean {
    if (this.findIndex(id) === -1) return false;
    this.users = this.users.filter((user) => user.id !== id);
    return true;
  }

  public changeStatus(id: string): UserModel | null {
    const user = this.findById(id);
    if (!user) return null;
    user.isActive = !user.isActive;
    return user;
  }

  public changeRole(id: string, role: Role): UserModel | null {
    const user = this.findById(id);
    if (!user) return null;
    user.role = role;
    return user;
  }

  private findIndex(id: string): number {
    return this.users.findIndex((task) => task.id === id);
  }
}
