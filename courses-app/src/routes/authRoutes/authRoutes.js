import { Router } from 'express';
import authController from '../../controllers/authController/authController.js';

class AuthRoutes {
	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	getRouter() {
		return this.router;
	}

	initializeRoutes() {
		this.router.post('/register', authController.register);
		this.router.post('/login', authController.login);
	}
}

export default new AuthRoutes().getRouter();
