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

import { CommentsService } from './comments.service';
import { CommentModel } from './comments.model';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { SuccessMessage } from '../types';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  public getComments(): CommentModel[] {
    return this.commentsService.findAll();
  }
  @Get(':id')
  public getCommentById(@Param('id') id: string): CommentModel {
    const comment = this.commentsService.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  @Put(':id')
  public updateComment(
    @Param('id') id: string,
    @Body() updateComment: UpdateCommentDto,
  ): CommentModel {
    const comment = this.commentsService.update(id, updateComment);
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  @Post()
  public createComment(createCommentDto: CreateCommentDto): SuccessMessage {
    this.commentsService.create(createCommentDto);
    return { message: 'Comment created' };
  }

  @Delete(':id')
  public deleteComment(@Param('id') id: string): CommentModel {
    const comment = this.commentsService.delete(id);
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }
}
