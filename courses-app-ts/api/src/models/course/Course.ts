import mongoose, { Model, Schema, Types } from 'mongoose';
import { ICourseDocument } from './types';

const courseSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        difficulty: { type: String, required: true },
        comments: [{ type: Types.ObjectId, ref: 'Comment' }],
        ratings: [{ type: Types.ObjectId, ref: 'Rating' }],
    },
    { timestamps: true }
);

const Course: Model<ICourseDocument> = mongoose.model<ICourseDocument>('courses', courseSchema);

export default Course;
