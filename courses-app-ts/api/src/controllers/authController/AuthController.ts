import { Request, Response } from 'express';
import User from '../../models/user/User';

class AuthController {
    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const user = new User({ username, password });
            await user.save();
            res.status(201).send({ message: 'User registered successfully' });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send({ message: 'Error registering user', error: err.message });
            }
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        res.status(200).send({ token: 'JWT token' });
    }
}

export default AuthController;
