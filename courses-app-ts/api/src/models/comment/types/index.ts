import { Types } from 'mongoose';

export interface IComment {
    id: Types.ObjectId;
    userId: Types.ObjectId;
    content: string;
    courseId: Types.ObjectId;
}

export interface ICommentDocument extends IComment {
    _id?: Types.ObjectId;
    save: () => Promise<ICommentDocument>;
}
