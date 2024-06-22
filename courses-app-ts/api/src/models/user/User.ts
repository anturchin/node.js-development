import mongoose, { Model, Schema } from 'mongoose';
import { IUserDocument } from './types';

const userSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin', 'author'], default: 'user' },
    },
    { timestamps: true }
);

const User: Model<IUserDocument> = mongoose.model<IUserDocument>('users', userSchema);

export default User;
