import { Request, Response } from 'express';
import User from '../../models/user/User';

class UserController {
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.find();
            res.status(200).send(users);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send({ message: 'Error fetching users', error: err.message });
            }
        }
    }
}

export default UserController;
