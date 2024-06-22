import { Types } from 'mongoose';

export interface IRating {
    id: Types.ObjectId;
    userId: Types.ObjectId;
    rating: number;
    courseId: Types.ObjectId;
}

export interface IRatingDocument extends IRating {
    _id?: Types.ObjectId;
    save: () => Promise<IRatingDocument>;
}
