import { Document, Types } from 'mongoose';

export interface IComment extends Document {
    userId: Types.ObjectId;
    content: string;
    courseId: Types.ObjectId;
}
