import { IComment } from '../../models/comment/types';
import Course from '../../models/course/Course';
import { ICourse } from '../../models/course/types';
import { IRating } from '../../models/rating/types';

export class CoursesService {
    public async findCourses(): Promise<ICourse[]> {
        const courses = await Course.find().exec();
        return courses;
    }

    public async createCourse({ title, description, difficulty }: ICourse): Promise<string> {
        const course = new Course({ title, description, difficulty });
        await course.save();
        return course.id;
    }

    public async addCommentToCourse(courseId: string, comment: IComment): Promise<boolean> {
        const foundCourse = await Course.findById(courseId).exec();
        if (foundCourse) {
            foundCourse.comments.push(comment.id);
            await foundCourse.save();
            return true;
        }
        return false;
    }

    public async addRatingToCourse(courseId: string, rating: IRating): Promise<boolean> {
        const foundCourse = await Course.findById(courseId).exec();
        if (foundCourse) {
            foundCourse.ratings.push(rating.id);
            await foundCourse.save();
            return true;
        }
        return false;
    }
}
