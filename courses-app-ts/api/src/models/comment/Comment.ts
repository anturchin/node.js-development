import mongoose, { Model, Schema, Types } from 'mongoose';
import { ICommentDocument } from './types';

const commentSchema: Schema = new Schema(
    {
        userId: { type: Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        courseId: { type: Types.ObjectId, ref: 'Course', required: true },
    },
    { timestamps: true }
);

const Comment: Model<ICommentDocument> = mongoose.model<ICommentDocument>(
    'comments',
    commentSchema
);

export default Comment;
