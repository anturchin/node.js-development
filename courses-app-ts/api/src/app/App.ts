import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import AuthRoutes from '../routes/authRoutes/AuthRoutes';
import CourseRoutes from '../routes/courseRoutes/CourseRoutes';
import UserRoutes from '../routes/userRoutes/UserRoutes';
import AppError from '../utils/AppError';
import DataBase from '../db/DataBase';

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
    }

    private initializeRoutes(): void {
        this.app.use('/api/auth', new AuthRoutes().getRouter());
        this.app.use('/api/courses', new CourseRoutes().getRouter());
        this.app.use('/api/users', new UserRoutes().getRouter());

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            next(new AppError(`Cannot find path: ${req.originalUrl} on this server!`, 404));
        });
    }

    private initializeErrorHandling(): void {
        this.app.use(
            (err: AppError | Error, req: Request, res: Response, next: NextFunction): void => {
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

    private async init(): Promise<void> {
        await DataBase.connect();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
}

export default App;
