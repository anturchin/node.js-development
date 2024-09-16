import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './users.service';
import { UserController } from './users.controller';
import { User } from './users.entity';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UsersResolver],
  controllers: [UserController],
})
export class UserModule {}
