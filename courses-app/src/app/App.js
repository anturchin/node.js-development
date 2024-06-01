import express from 'express';
import bodyParser from 'body-parser';
import AuthRoutes from '../routes/authRoutes/AuthRoutes.js';
import CourseRoutes from '../routes/courseRoutes/CourseRoutes.js';
import UserRoutes from '../routes/userRoutes/UserRoutes.js';
import AppError from '../utils/AppError.js';

class App {
	constructor() {
		this.app = express();
		this.initializeMiddleware();
		this.initializeRoutes();
		this.initializeErrorHandling();
	}

	getApp() {
		return this.app;
	}

	initializeMiddleware() {
		this.app.use(bodyParser.json());
	}

	initializeRoutes() {
		this.app.use('/api/auth', new AuthRoutes().getRouter());
		this.app.use('/api/courses', new CourseRoutes().getRouter());
		this.app.use('/api/users', new UserRoutes().getRouter());

		this.app.all('*', (req, res, next) => {
			next(new AppError(`Cannot find path: ${req.originalUrl} on this server!`, 404));
		});
	}

	initializeErrorHandling() {
		// eslint-disable-next-line no-unused-vars
		this.app.use((err, req, res, next) => {
			if (err instanceof AppError) {
				res.status(err.statusCode).json({
					status: err.statusCode,
					message: err.message,
				});
			} else {
				res.status(500).json({
					message: err.message,
				});
			}
		});
	}
}

export default App;
