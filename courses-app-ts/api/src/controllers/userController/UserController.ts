import { NextFunction, Request, Response } from 'express';
import User from '../../models/user/User';
import { IUser, Role } from '../../models/user/types';
import AppError from '../../utils/AppError';

class UserController {
    public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, username, password } = req.body;

            if (!email || !username || !password) {
                throw new AppError('Email, username, and password are required', 400);
            }

            const existingUser = await this.findUserByEmail(email);

            if (existingUser) {
                throw new AppError('User with this email already exists', 400);
            } else {
                const user = new User({ email, username, password });
                await user.save();
                res.status(201).send({
                    message: 'User created successfully',
                    username: user.username,
                    userId: user.id,
                    role: user.role,
                });
            }
        } catch (err) {
            next(err);
        }
    }

    public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.findUsers();
            res.status(200).send(users);
        } catch (err) {
            next(err);
        }
    }

    public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const user = await this.findUserById(userId);
            if (user) {
                res.status(200).send({ message: 'Fetch user by id', user });
            } else {
                throw new AppError('User not found', 404);
            }
        } catch (err) {
            next(err);
        }
    }

    public async updateUserRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const { role } = req.params;

            if (!this.checkUserRole(role as Role)) {
                throw new AppError('Invalid role', 404);
            }

            const user = await this.findUserById(userId);

            if (user) {
                user.role = role as Role;
                await user.save();
                res.status(200).send({ message: 'User role updated successfully' });
            } else {
                throw new AppError('User not found', 404);
            }
        } catch (err) {
            next(err);
        }
    }

    public async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const user = await this.findByIdAndDelete(userId);
            if (user) {
                res.status(200).send({ message: 'User deleted successfully' });
            } else {
                throw new AppError('User not found', 404);
            }
        } catch (err) {
            next(err);
        }
    }

    private checkUserRole(role: Role): boolean {
        switch (role) {
            case Role.USER:
            case Role.ADMIN:
            case Role.AUTHOR:
                return true;
            default:
                return false;
        }
    }

    private async findByIdAndDelete(userId: string): Promise<IUser | null> {
        const user = await User.findByIdAndDelete(userId).exec();
        return user;
    }

    private async findUserById(userId: string): Promise<IUser | null> {
        const user = await User.findById(userId).exec();
        return user;
    }

    private async findUserByEmail(email: string): Promise<IUser | null> {
        const user = await User.findOne({ email }).exec();
        return user;
    }

    private async findUsers(): Promise<IUser[]> {
        const users = await User.find().exec();
        return users;
    }
}

export default UserController;
