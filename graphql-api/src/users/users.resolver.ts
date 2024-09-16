import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';

import { UserService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    await this.userService.remove(id);
    return true;
  }
}
