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
        this.router.post('/comments', this.courseController.addComment.bind(this.courseController));
        this.router.get(
            '/comments/:courseId',
            this.courseController.getComments.bind(this.courseController)
        );
        this.router.delete(
            '/comments/:commentId',
            this.courseController.deleteComment.bind(this.courseController)
        );
        this.router.post('/ratings', this.courseController.addRating.bind(this.courseController));
        this.router.get(
            '/ratings/:courseId',
            this.courseController.getRatings.bind(this.courseController)
        );
        this.router.delete(
            '/ratings/:ratingId',
            this.courseController.deleteRating.bind(this.courseController)
        );
    }
}

export default CourseRoutes;
