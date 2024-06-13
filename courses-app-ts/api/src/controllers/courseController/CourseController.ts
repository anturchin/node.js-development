import { NextFunction, Request, Response } from 'express';
import { CoursesService } from '../../services/coursesService/CoursesService';
import { CommentService } from '../../services/commentService/CommentService';
import { RatingService } from '../../services/ratingService/RatingService';
import AppError from '../../utils/AppError';
import { IUpdateCourseDTO } from '../../dto/courseDto/UpdateCourseDto';
import { ICreateCourseDto } from '../../dto/courseDto/CreateCourseDto';
import { ICreateRatingDto } from '../../dto/ratingDto/CreateRatingDto';
import { ICreateCommentDto } from '../../dto/commentDto/CreateCommentDto';

class CourseController {
    private readonly coursesService: CoursesService;

    private readonly commentService: CommentService;

    private readonly ratingService: RatingService;

    constructor(
        coursesService: CoursesService,
        commentService: CommentService,
        ratingService: RatingService
    ) {
        this.coursesService = coursesService;
        this.commentService = commentService;
        this.ratingService = ratingService;
    }

    public async addComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId, content, courseId }: ICreateCommentDto = req.body;
            if (!userId || !content || !courseId) {
                throw new AppError('UserId, content, and courseId are required', 400);
            }
            const newComment = await this.commentService.createNewComment({
                userId,
                content,
                courseId,
            });

            const addedComment = await this.coursesService.addCommentToCourse(courseId, newComment);
            if (!addedComment) {
                throw new AppError('Comment add failed', 400);
            }
            res.status(201).send({ message: 'Comment added successfully', newComment });
        } catch (err) {
            next(err);
        }
    }

    public async getComments(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { courseId } = req.params;
            const comments = await this.commentService.findCommentsByCourseId(courseId as string);
            res.status(200).send(comments);
        } catch (err) {
            next(err);
        }
    }

    public async deleteComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { commentId } = req.params;
            const deletedComment = await this.commentService.deleteComment(commentId);
            res.status(200).send({ message: 'Comment deleted successfully', deletedComment });
        } catch (err) {
            next(err);
        }
    }

    public async addRating(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId, rating, courseId }: ICreateRatingDto = req.body;
            if (!userId || !rating || !courseId) {
                throw new AppError('UserId, rating, and courseId are required', 400);
            }
            const newRating = await this.ratingService.createNewRating({
                userId,
                rating,
                courseId,
            });

            const addedRating = await this.coursesService.addRatingToCourse(courseId, newRating);
            if (!addedRating) {
                throw new AppError('Rating add failed', 400);
            }

            res.status(201).send({ message: 'Rating added successfully', newRating });
        } catch (err) {
            next(err);
        }
    }

    public async getRatings(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { courseId } = req.params;
            if (!courseId) {
                throw new AppError('CourseId is required', 400);
            }
            const foundRatings = await this.ratingService.findRatingsByCourseId(courseId);
            res.status(200).send({ foundRatings });
        } catch (err) {
            next(err);
        }
    }

    public async deleteRating(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { ratingId } = req.params;
            const deletedRating = await this.ratingService.deleteRating(ratingId);
            if (!deletedRating) {
                throw new AppError('Rating not found', 404);
            }
            res.status(200).send({ message: 'Rating deleted successfully', deletedRating });
        } catch (err) {
            next(err);
        }
    }

    public async getAllCourses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const courses = await this.coursesService.findCourses();
            res.status(200).send(courses);
        } catch (err) {
            next(err);
        }
    }

    public async getCourseById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { courseId } = req.params;
            const courses = await this.coursesService.findCourseById(courseId);
            if (!courses) {
                throw new AppError('Course not found', 404);
            }
            res.status(200).send(courses);
        } catch (err) {
            next(err);
        }
    }

    public async deleteCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { courseId } = req.params;
            const deletedCourse = await this.coursesService.deleteCourseById(courseId);
            if (!deletedCourse) {
                throw new AppError('Course not found', 404);
            }
            res.status(200).send({ message: 'Course deleted successfully', deletedCourse });
        } catch (err) {
            next(err);
        }
    }

    public async createCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title, description, difficulty }: ICreateCourseDto = req.body;
            const courseId = await this.coursesService.createCourse({
                title,
                description,
                difficulty,
            });

            res.status(201).send({
                message: 'Course created successfully',
                courseId,
            });
        } catch (err) {
            next(err);
        }
    }

    public async updateCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { courseId } = req.params;
            const updateData: IUpdateCourseDTO = req.body;
            const updateCourse = await this.coursesService.updateCourseById(courseId, updateData);
            if (!updateCourse) {
                throw new AppError('Course not found', 404);
            }
            res.status(200).send({ message: 'Course updated successfully', updateCourse });
        } catch (err) {
            next(err);
        }
    }
}

export default CourseController;
