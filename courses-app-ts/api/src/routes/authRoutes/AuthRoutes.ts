import express, { Router } from 'express';
import AuthController from '../../controllers/authController/AuthController';

class AuthRoutes {
    private readonly router: Router;

    private readonly authController: AuthController;

    constructor(authController: AuthController) {
        this.router = express.Router();
        this.authController = authController;
        this.initializeRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private initializeRoutes(): void {
        this.router.post('/register', this.authController.register.bind(this.authController));
        this.router.post('/login', this.authController.login.bind(this.authController));
    }
}

export default AuthRoutes;
