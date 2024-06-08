import { describe, expect, test, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
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

describe('Auth API', () => {
    test('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', email: 'testuser@example.com', password: 'password' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    test('should login a user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'testuser@example.com', password: 'password' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', 'ok');
    });

    test('should handle login with invalid credentials', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'testuser@example.com', password: 'wrongpassword' });
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid email or password');
    });
});
