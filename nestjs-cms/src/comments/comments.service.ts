import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Comment } from './comments.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [
    { id: '1', text: 'some text', authorId: '2' },
    { id: '2', text: 'some text', authorId: '2' },
    { id: '3', text: 'some text', authorId: '3' },
  ];

  public findAll(): Comment[] {
    return this.comments;
  }

  public findById(id: string): Comment | null {
    if (this.findIndex(id) === -1) return null;
    return this.comments[this.findIndex(id)];
  }

  public create(createComment: CreateCommentDto): void {
    this.comments.push({ id: uuidv4(), ...createComment });
  }

  public delete(id: string): Comment | null {
    const comment = this.findById(id);
    if (!comment) return null;
    this.comments = this.comments.filter((comment) => comment.id !== id);
    return comment;
  }

  public update(id: string, updateComment: UpdateCommentDto): Comment | null {
    if (this.findIndex(id) === -1) return null;
    this.comments[this.findIndex(id)] = {
      ...this.comments[this.findIndex(id)],
      ...updateComment,
    };
    return this.comments[this.findIndex(id)];
  }

  private findIndex(id: string): number {
    return this.comments.findIndex((comment) => comment.id === id);
  }
}
