import { Request, Response } from 'express';
import Course from '../../models/course/Course';
import { ICourse } from '../../models/course/types';

class CourseController {
    public async getAllCourses(req: Request, res: Response): Promise<void> {
        try {
            const courses = await this.findCourses();
            res.status(200).send(courses);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send({ message: 'Error fetching courses', error: err.message });
            }
        }
    }

    public async createCourse(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, difficulty } = req.body;
            const course = new Course({ title, description, difficulty });
            await course.save();
            res.status(201).send({ message: 'Course created successfully' });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send({ message: 'Error creating course', error: err.message });
            }
        }
    }

    private async findCourses(): Promise<ICourse[]> {
        const user = await Course.find().exec();
        return user;
    }
}

export default CourseController;
