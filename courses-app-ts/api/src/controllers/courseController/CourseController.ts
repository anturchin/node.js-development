import { NextFunction, Request, Response } from 'express';
import { ICourse } from '../../models/course/types';
import { CoursesService } from '../../services/coursesService/CoursesService';
import { CommentService } from '../../services/commentService/CommentService';
import { RatingService } from '../../services/ratingService/RatingService';
import AppError from '../../utils/AppError';
import { IRating } from '../../models/rating/types';
import { IComment } from '../../models/comment/types';

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
            const { userId, content, courseId } = req.body;
            if (!userId || !content || !courseId) {
                throw new AppError('UserId, content, and courseId are required', 400);
            }
            const newComment = await this.commentService.createNewComment({
                userId,
                content,
                courseId,
            } as IComment);
            const addedComment = this.coursesService.addCommentToCourse(courseId, newComment);
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
            const { userId, rating, courseId } = req.body;
            if (!userId || !rating || !courseId) {
                throw new AppError('UserId, rating, and courseId are required', 400);
            }
            const newRating = await this.ratingService.createNewRating({
                userId,
                rating,
                courseId,
            } as IRating);

            const addedRating = this.coursesService.addRatingToCourse(courseId, newRating);
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
            if (!ratingId) {
                throw new AppError('RatingId is required', 400);
            }
            const deletedRating = await this.ratingService.deleteRating(ratingId);
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
