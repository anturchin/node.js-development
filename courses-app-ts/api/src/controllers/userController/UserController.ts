import { Request, Response } from 'express';
import User from '../../models/user/User';
import { IUser } from '../../models/user/types';

class UserController {
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.findUsers();
            res.status(200).send(users);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send({ message: 'Error fetching users', error: err.message });
            }
        }
    }

    private async findUsers(): Promise<IUser[]> {
        const users = await User.find().exec();
        return users;
    }
}

export default UserController;
