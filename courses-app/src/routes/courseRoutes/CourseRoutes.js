import express from 'express';
import CourseController from '../../controllers/courseController/CourseController.js';

class CourseRoutes {
	constructor() {
		this.router = express.Router();
		this.courseController = new CourseController();
		this.initializeRoutes();
	}

	getRouter() {
		return this.router;
	}

	initializeRoutes() {
		this.router.get('/', this.courseController.getAllCourses.bind(this.courseController));
		this.router.post('/', this.courseController.createCourse.bind(this.courseController));
	}
}

export default CourseRoutes;
