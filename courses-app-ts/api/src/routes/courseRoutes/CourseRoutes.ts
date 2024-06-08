import express, { Router } from 'express';
import CourseController from '../../controllers/courseController/CourseController';

class CourseRoutes {
    private readonly router: Router;

    private readonly courseController: CourseController;

    constructor() {
        this.router = express.Router();
        this.courseController = new CourseController();
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
