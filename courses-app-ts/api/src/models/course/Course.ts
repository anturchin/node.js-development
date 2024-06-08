import mongoose, { Model, Schema } from 'mongoose';
import { ICourse } from './types';

const courseSchema: Schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

const Course: Model<ICourse> = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
