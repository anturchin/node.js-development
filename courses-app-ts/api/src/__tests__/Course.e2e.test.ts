import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import App from '../app/App';

import DataBase from '../db/DataBase';

const app = new App().getApp();

beforeAll(async () => {
    const dbUri = 'mongodb://127.0.0.1:27017/testdb';
    await DataBase.connect(dbUri);
});

afterAll(async () => {
    await DataBase.disconnect();
});

describe('Course API', () => {
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
});
