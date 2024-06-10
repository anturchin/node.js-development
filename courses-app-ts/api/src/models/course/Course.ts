import mongoose, { Model, Schema, Types } from 'mongoose';
import { ICourse } from './types';

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

const Course: Model<ICourse> = mongoose.model<ICourse>('courses', courseSchema);

export default Course;
