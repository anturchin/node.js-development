import { Types } from 'mongoose';
import { ICreateCourseDto } from '../../dto/courseDto/CreateCourseDto';
import { IUpdateCourseDTO } from '../../dto/courseDto/UpdateCourseDto';
import { IComment } from '../../models/comment/types';
import Course from '../../models/course/Course';
import { ICourseDocument } from '../../models/course/types';
import { IRatingDocument } from '../../models/rating/types';

export class CoursesService {
    public async findCourses(): Promise<ICourseDocument[]> {
        const courses = await Course.find().exec();
        return courses;
    }

    public async findCourseById(courseId: string): Promise<ICourseDocument | null> {
        const courses = await Course.findById(courseId).exec();
        return courses;
    }

    public async updateCourseById(
        courseId: string,
        updateData: IUpdateCourseDTO
    ): Promise<ICourseDocument | null> {
        const updateCourse = await Course.findByIdAndUpdate(courseId, updateData, {
            new: true,
        }).exec();
        return updateCourse;
    }

    public async createCourse({
        title,
        description,
        difficulty,
    }: ICreateCourseDto): Promise<Types.ObjectId> {
        const course = new Course({ title, description, difficulty });
        await course.save();
        return course.id;
    }

    public async deleteCourseById(courseId: string): Promise<ICourseDocument | null> {
        const deletedCourse = await Course.findByIdAndDelete(courseId).exec();
        return deletedCourse;
    }

    public async addCommentToCourse(courseId: string, comment: IComment): Promise<boolean> {
        const foundCourse = await this.findCourseById(courseId);
        if (foundCourse) {
            foundCourse.comments.push(comment.id);
            await foundCourse.save();
            return true;
        }
        return false;
    }

    public async addRatingToCourse(courseId: string, rating: IRatingDocument): Promise<boolean> {
        const foundCourse = await Course.findById(courseId).exec();
        if (foundCourse) {
            foundCourse.ratings.push(rating.id);
            await foundCourse.save();
            return true;
        }
        return false;
    }
}
