import request from 'supertest';
import App from '../app/App';

import DataBase from '../db/DataBase';

const app = new App().getApp();

beforeAll(async () => {
    const dbUri = 'mongodb://127.0.0.1:27017/testdb';
    await DataBase.connect(dbUri);
});

afterAll(async () => {
    await DataBase.clearCollections();
    await DataBase.disconnect();
});

describe('Course API', () => {
    let courseId: string;
    let userId: string;
    let commentId: string;
    let ratingId: string;

    beforeAll(async () => {
        const user = await request(app)
            .post('/api/auth/register')
            .send({ email: 'lebowski@gmail.com', username: 'lebowski', password: 'pass' });
        userId = user.body.userId;

        const course = await request(app)
            .post('/api/courses')
            .send({ title: 'JavaScript', description: 'Top', difficulty: 'easy' });
        courseId = course.body.courseId;
    });

    test('should fetch all courses', async () => {
        const response = await request(app).get('/api/courses');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should create a new course', async () => {
        const response = await request(app).post('/api/courses').send({
            title: 'Test Course',
            description: 'A course for testing',
            difficulty: 'easy',
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Course created successfully');
    });

    test('should add a comment to the course', async () => {
        const newComment: { userId: string; content: string; courseId: string } = {
            userId,
            content: 'Nice course!',
            courseId,
        };
        const response = await request(app).post('/api/courses/comments').send(newComment);

        commentId = response.body.newComment._id;

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Comment added successfully');
        expect(commentId).toBeDefined();
    });

    test('should get comments for the course', async () => {
        const response = await request(app).get(`/api/courses/${courseId}/comments`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should delete a comment from the course', async () => {
        const response = await request(app).delete(`/api/courses/comments/${commentId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment deleted successfully');
    });

    test('should add a rating to the course', async () => {
        const newRating: { userId: string; rating: number; courseId: string } = {
            userId,
            rating: 5,
            courseId,
        };
        const response = await request(app).post('/api/courses/ratings').send(newRating);

        ratingId = response.body.newRating._id;

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Rating added successfully');
        expect(ratingId).toBeDefined();
    });

    test('should get ratings for the course', async () => {
        const response = await request(app).get(`/api/courses/${courseId}/ratings`);
        expect(response.statusCode).toBe(200);
        expect(response.body.foundRatings).toBeInstanceOf(Array);
    });

    test('should delete a rating from the course', async () => {
        const response = await request(app).delete(`/api/courses/ratings/${ratingId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Rating deleted successfully');
    });
});
