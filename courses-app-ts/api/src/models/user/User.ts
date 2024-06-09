import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from './types';

const userSchema: Schema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin', 'author'], default: 'user' },
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
