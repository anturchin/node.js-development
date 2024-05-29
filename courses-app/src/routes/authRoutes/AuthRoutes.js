import express from 'express';
import AuthController from '../../controllers/authController/AuthController.js';

class AuthRoutes {
	constructor() {
		this.router = express.Router();
		this.authController = new AuthController();
		this.initializeRoutes();
	}

	getRouter() {
		return this.router;
	}

	initializeRoutes() {
		this.router.post('/register', this.authController.register.bind(this.authController));
		this.router.post('/login', this.authController.login.bind(this.authController));
	}
}

export default AuthRoutes;
