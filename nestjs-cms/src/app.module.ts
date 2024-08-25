import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [UsersModule, CommentsModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
