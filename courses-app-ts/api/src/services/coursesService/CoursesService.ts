import Course from '../../models/course/Course';
import { ICourse } from '../../models/course/types';

export class CoursesService {
    public async findCourses(): Promise<ICourse[]> {
        const courses = await Course.find().exec();
        return courses;
    }

    public async createCourse({ title, description, difficulty }: ICourse): Promise<void> {
        const course = new Course({ title, description, difficulty });
        await course.save();
    }
}
