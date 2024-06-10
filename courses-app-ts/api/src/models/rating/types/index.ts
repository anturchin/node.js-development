import { Types } from 'mongoose';

export interface IRating extends Document {
    userId: Types.ObjectId;
    rating: number;
    courseId: Types.ObjectId;
}
