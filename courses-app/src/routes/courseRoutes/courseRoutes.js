import { Router } from 'express';
import courseController from '../../controllers/courseController/courseController.js';

class CourseRoutes {
	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	getRouter() {
		return this.router;
	}

	initializeRoutes() {
		this.router.get('/', courseController.getAllCourses);
		this.router.post('/', courseController.createCourse);
	}
}

export default new CourseRoutes().getRouter();
