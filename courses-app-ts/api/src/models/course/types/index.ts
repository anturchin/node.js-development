import { Types } from 'mongoose';
import { IRating } from '../../rating/types';

export interface ICourse extends Document {
    title: string;
    description: string;
    difficulty: string;
    comments: Types.ObjectId[];
    ratings: IRating[];
}
