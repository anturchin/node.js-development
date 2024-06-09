import { NextFunction, Request, Response } from 'express';
import { ICourse } from '../../models/course/types';
import { CoursesService } from '../../services/coursesService/CoursesService';

class CourseController {
    private readonly coursesService: CoursesService;

    constructor(coursesService: CoursesService) {
        this.coursesService = coursesService;
    }

    public async getAllCourses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const courses = await this.coursesService.findCourses();
            res.status(200).send(courses);
        } catch (err) {
            next(err);
        }
    }

    public async createCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title, description, difficulty } = req.body;
            await this.coursesService.createCourse({
                title,
                description,
                difficulty,
            } as ICourse);
            res.status(201).send({ message: 'Course created successfully' });
        } catch (err) {
            next(err);
        }
    }
}

export default CourseController;
