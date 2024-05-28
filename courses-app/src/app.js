import express from 'express';
import authRoutes from './routes/authRoutes/authRoutes.js';
import courseRoutes from './routes/courseRoutes/courseRoutes.js';
import userRoutes from './routes/userRoutes/userRoutes.js';

class App {
	constructor() {
		this.app = express();
		this.initialize();
	}

	getApp() {
		return this.app;
	}

	initialize() {
		this.app.use('/api/auth', authRoutes);
		this.app.use('/api/courses', courseRoutes);
		this.app.use('/api/users', userRoutes);
	}
}

export default new App().getApp();
