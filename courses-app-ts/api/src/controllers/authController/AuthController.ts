import { NextFunction, Request, Response } from 'express';
import { IUser } from '../../models/user/types';
import AppError from '../../utils/AppError';
import { UserService } from '../../services/userService/UserService';

class AuthController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, username, password } = req.body;

            if (!email || !username || !password) {
                throw new AppError('Email, username, and password are required', 400);
            }

            const existingUser = await this.userService.findUserByEmail(email);

            if (existingUser) {
                throw new AppError('User with this email already exists', 400);
            } else {
                const user = await this.userService.createUser({
                    email,
                    username,
                    password,
                } as IUser);
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

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await this.userService.findUser({ email, password });
            if (user) {
                res.status(200).send({ success: 'ok' });
            } else {
                throw new AppError('Invalid email or password', 401);
            }
        } catch (err) {
            next(err);
        }
    }
}

export default AuthController;
