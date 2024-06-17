import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import AuthRoutes from '../routes/authRoutes/AuthRoutes';
import CourseRoutes from '../routes/courseRoutes/CourseRoutes';
import UserRoutes from '../routes/userRoutes/UserRoutes';
import AppError from '../utils/AppError';
import UserController from '../controllers/userController/UserController';
import { UserService } from '../services/userService/UserService';
import CourseController from '../controllers/courseController/CourseController';
import { CoursesService } from '../services/coursesService/CoursesService';
import AuthController from '../controllers/authController/AuthController';
import { CommentService } from '../services/commentService/CommentService';
import { RatingService } from '../services/ratingService/RatingService';
import AuthMiddleware from '../middleware/AuthMiddleware';

class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.init();
    }

    public getApp(): Express {
        return this.app;
    }

    private initializeMiddleware(): void {
        this.app.use(bodyParser.json());
        const authMiddleware = new AuthMiddleware(process.env.SECRET_KEY as string);
        this.app.use(authMiddleware.execute.bind(authMiddleware));
    }

    private initializeRoutes(): void {
        const salt = parseInt(process.env.SALT_ROUND as string, 10);
        const userService = new UserService(salt);

        this.app.use('/api/auth', new AuthRoutes(new AuthController(userService)).getRouter());
        this.app.use(
            '/api/courses',
            new CourseRoutes(
                new CourseController(
                    new CoursesService(),
                    new CommentService(),
                    new RatingService()
                )
            ).getRouter()
        );
        this.app.use('/api/users', new UserRoutes(new UserController(userService)).getRouter());

        this.app.use((req: Request, _: Response, next: NextFunction) => {
            next(new AppError(`Cannot find path: ${req.originalUrl} on this server!`, 404));
        });
    }

    private initializeErrorHandling(): void {
        this.app.use(
            (err: AppError | Error, _: Request, res: Response, next: NextFunction): void => {
                if (err instanceof AppError) {
                    res.status(err.statusCode).json({
                        status: err.statusCode,
                        message: err.message,
                    });
                } else {
                    res.status(500).json({
                        message: err.message,
                    });
                }
                next();
            }
        );
    }

    private init(): void {
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
}

export default App;
