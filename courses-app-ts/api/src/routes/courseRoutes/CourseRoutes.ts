import express, { Router } from 'express';
import CourseController from '../../controllers/courseController/CourseController';

class CourseRoutes {
    private readonly router: Router;

    private readonly courseController: CourseController;

    constructor(courseController: CourseController) {
        this.router = express.Router();
        this.courseController = courseController;
        this.initializeRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private initializeRoutes(): void {
        this.router.get('/', this.courseController.getAllCourses.bind(this.courseController));
        this.router.post('/', this.courseController.createCourse.bind(this.courseController));
    }
}

export default CourseRoutes;
