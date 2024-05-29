import express from 'express';
import AuthRoutes from '../routes/authRoutes/AuthRoutes.js';
import CourseRoutes from '../routes/courseRoutes/CourseRoutes.js';
import UserRoutes from '../routes/userRoutes/UserRoutes.js';
import bodyParser from 'body-parser';

class App {
	constructor() {
		this.app = express();
		this.authRoutes = new AuthRoutes();
		this.courseRoutes = new CourseRoutes();
		this.userRoutes = new UserRoutes();
		this.initialize();
	}

	getApp() {
		return this.app;
	}

	middleware() {
		this.app.use(bodyParser.json());
	}

	initialize() {
		this.middleware();
		this.app.use('/auth', this.authRoutes.getRouter());
		this.app.use('/courses', this.courseRoutes.getRouter());
		this.app.use('/users', this.userRoutes.getRouter());
	}
}

export default App;
