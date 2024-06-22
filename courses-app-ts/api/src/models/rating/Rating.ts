import mongoose, { Model, Schema, Types } from 'mongoose';
import { IRating } from './types';

const ratingSchema: Schema = new Schema(
    {
        userId: { type: Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, required: true },
        courseId: { type: Types.ObjectId, ref: 'Course', required: true },
    },
    { timestamps: true }
);

const Rating: Model<IRating> = mongoose.model<IRating>('ratings', ratingSchema);

export default Rating;
