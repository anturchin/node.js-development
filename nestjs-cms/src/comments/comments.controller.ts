import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { Comment, ErrorComment } from './comments.interface';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  public getComments(): Comment[] {
    return this.commentsService.findAll();
  }
  @Get(':id')
  public getCommentById(@Param('id') id: string): Comment | ErrorComment {
    const comment = this.commentsService.findById(id);
    if (!comment) return { message: 'Comment not found' };
    return comment;
  }

  @Put(':id')
  public updateComment(
    @Param('id') id: string,
    @Body() updateComment: UpdateCommentDto,
  ): Comment | ErrorComment {
    const comment = this.commentsService.update(id, updateComment);
    if (!comment) return { message: 'Comment not found' };
    return comment;
  }

  @Post()
  public createComment(createCommentDto: CreateCommentDto): void {
    return this.commentsService.create(createCommentDto);
  }

  @Delete(':id')
  public deleteComment(@Param('id') id: string): Comment | ErrorComment {
    const comment = this.commentsService.delete(id);
    if (!comment) return { message: 'Comment not found' };
    return comment;
  }
}
