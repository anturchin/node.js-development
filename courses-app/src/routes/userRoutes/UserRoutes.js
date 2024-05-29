import express from 'express';
import UserController from '../../controllers/userController/UserController.js';

class UserRoutes {
	constructor() {
		this.router = express.Router();
		this.userController = new UserController();
		this.initializeRoutes();
	}

	getRouter() {
		return this.router;
	}

	initializeRoutes() {
		this.router.get('/', this.userController.getAllUsers.bind(this.userController));
	}
}

export default UserRoutes;
