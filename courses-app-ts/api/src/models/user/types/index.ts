import { Document } from 'mongoose';

export const enum Role {
    USER = 'user',
    ADMIN = 'admin',
    AUTHOR = 'author',
}
export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    role?: Role;
}
