import express, { Router } from 'express';
import UserController from '../../controllers/userController/UserController';

class UserRoutes {
    private readonly router: Router;

    private readonly userController: UserController;

    constructor(userController: UserController) {
        this.router = express.Router();
        this.userController = userController;
        this.initializeRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private initializeRoutes(): void {
        this.router.get('/', this.userController.getAllUsers.bind(this.userController));
        this.router.post('/', this.userController.createUser.bind(this.userController));
        this.router.get('/:userId', this.userController.getUserById.bind(this.userController));
        this.router.delete(
            '/:userId',
            this.userController.deleteUserById.bind(this.userController)
        );
        this.router.put(
            '/:userId/:role',
            this.userController.updateUserRole.bind(this.userController)
        );
    }
}

export default UserRoutes;
