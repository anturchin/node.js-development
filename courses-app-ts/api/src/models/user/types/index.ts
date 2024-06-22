import { Types } from 'mongoose';

export const enum Role {
    USER = 'user',
    ADMIN = 'admin',
    AUTHOR = 'author',
}
export interface IUser {
    id: Types.ObjectId;
    email: string;
    username: string;
    password: string;
    role?: Role;
}

export interface IUserDocument extends IUser {
    _id?: Types.ObjectId;
    save: () => Promise<IUserDocument>;
}
