import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import App from '../app/App';

import DataBase from '../db/DataBase';
import { Role } from '../models/user/types';

const app = new App().getApp();

beforeAll(async () => {
    const dbUri = 'mongodb://127.0.0.1:27017/testdb';
    await DataBase.connect(dbUri);
});

afterAll(async () => {
    await DataBase.disconnect();
});

describe('User API', () => {
    let userId: string;

    test('should fetch all users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ email: 'test@example.com', username: 'testuser', password: 'testpassword' });

        userId = response.body.userId;

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    });

    test('should fetch user by id', async () => {
        const response = await request(app).get(`/api/users/${userId}`).send();

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Fetch user by id');
    });

    test('should fail to fetch user by id', async () => {
        const response = await request(app).get(`/api/users/${userId}1`).send();

        expect(response.statusCode).toBe(500);
    });

    test('should return 400 if email already exists', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ email: 'test@example.com', username: 'testuser', password: 'testpassword' });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('User with this email already exists');
    });

    test('should return 400 if request body is invalid', async () => {
        const response = await request(app).post('/api/users').send({ email: 'test@example.com' });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Email, username, and password are required');
    });

    test('should update user role', async () => {
        const response = await request(app).put(`/api/users/${userId}/${Role.ADMIN}`).send();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User role updated successfully');
    });

    test('should delete user', async () => {
        const response = await request(app).delete(`/api/users/${userId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User deleted successfully');
    });
});
