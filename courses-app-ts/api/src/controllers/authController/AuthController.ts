import { NextFunction, Request, Response } from 'express';
import User from '../../models/user/User';
import { IUser } from '../../models/user/types';
import AppError from '../../utils/AppError';

class AuthController {
    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, username, password } = req.body;
            const user = new User({ email, username, password });
            await user.save();
            res.status(201).send({ message: 'User registered successfully' });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send({ message: 'Error registering user', error: err.message });
            }
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await this.findUser({ email, password });
            if (user) {
                res.status(200).send({ success: 'ok' });
            } else {
                next(new AppError('Invalid email or password', 401));
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send({ message: 'Error login user', error: err.message });
            }
        }
    }

    private async findUser({
        email,
        password,
    }: Pick<IUser, 'email' | 'password'>): Promise<IUser | null> {
        const user = await User.findOne({ email, password }).exec();
        return user;
    }
}

export default AuthController;
