import express, { Router } from 'express';
import UserController from '../../controllers/userController/UserController';

class UserRoutes {
    private readonly router: Router;

    private readonly userController: UserController;

    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private initializeRoutes(): void {
        this.router.get('/', this.userController.getAllUsers.bind(this.userController));
    }
}

export default UserRoutes;
