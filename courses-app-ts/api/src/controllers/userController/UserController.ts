import { NextFunction, Request, Response } from 'express';
import { Role } from '../../models/user/types';
import AppError from '../../utils/AppError';
import { UserService } from '../../services/userService/UserService';
import { ICreateUserDto } from '../../dto/userDto/CreateUserDto';

class UserController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
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
                });
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
            const users = await this.userService.findUsers();
            res.status(200).send(users);
        } catch (err) {
            next(err);
        }
    }

    public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const user = await this.userService.findUserById(userId);
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
            const updatedRole = await this.userService.updateUsersRole(role as Role, userId);
            if (updatedRole) {
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
            const user = await this.userService.findByIdAndDelete(userId);
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
}

export default UserController;
