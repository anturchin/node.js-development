import { Request, Response } from 'express';
import Course from '../../models/course/Course';

class CourseController {
    public async getAllCourses(req: Request, res: Response): Promise<void> {
        try {
            const courses = await Course.find();
            res.status(200).send(courses);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send({ message: 'Error fetching courses', error: err.message });
            }
        }
    }

    public async createCourse(req: Request, res: Response): Promise<void> {
        try {
            const { title, description } = req.body;
            const course = new Course({ title, description });
            await course.save();
            res.status(201).send({ message: 'Course created successfully' });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send({ message: 'Error creating course', error: err.message });
            }
        }
    }
}

export default CourseController;
