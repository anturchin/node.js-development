import { Router } from 'express';
import userController from '../../controllers/userController/userController.js';

class UserRoutes {
	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	getRouter() {
		return this.router;
	}

	initializeRoutes() {
		this.router.get('/', userController.getAllUsers);
	}
}

export default new UserRoutes().getRouter();
