import { Types } from 'mongoose';

export interface ICourse {
    id: Types.ObjectId;
    title: string;
    description: string;
    difficulty: string;
    comments: Types.ObjectId[];
    ratings: Types.ObjectId[];
}

export interface ICourseDocument extends ICourse {
    _id?: Types.ObjectId;
    save: () => Promise<ICourseDocument>;
}
