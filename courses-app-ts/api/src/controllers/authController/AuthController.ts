import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { IUser } from '../../models/user/types';
import AppError from '../../utils/AppError';
import { UserService } from '../../services/userService/UserService';
import { ICreateUserDto } from '../../dto/userDto/CreateUserDto';

class AuthController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, username, password }: ICreateUserDto = req.body;

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
            const { email, password }: Omit<ICreateUserDto, 'username'> = req.body;
            const user = await this.userService.findUser({ email, password });
            if (user) {
                const jwt = await this.signJWT(email, process.env.SECRET_KEY as string);
                res.status(200).send({ success: 'ok', token: jwt });
            } else {
                throw new AppError('Invalid email or password', 401);
            }
        } catch (err) {
            next(err);
        }
    }

    private async signJWT(email: string, secret: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            sign(
                {
                    email,
                    iat: Math.floor(Date.now() / 1000),
                },
                secret,
                {
                    algorithm: 'HS256',
                },
                (err, token) => {
                    if (err) reject(err);
                    resolve(token as string);
                }
            );
        });
    }
}

export default AuthController;
