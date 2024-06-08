import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import App from '../app/App';

describe('Auth API', () => {
    test('should register a new user', async () => {
        const response = await request(new App().getApp())
            .post('/api/auth/register')
            .send({ username: 'testuser', email: 'testuser@example.com', password: 'password' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    test('should login a user', async () => {
        const response = await request(new App().getApp())
            .post('/api/auth/login')
            .send({ email: 'testuser@example.com', password: 'password' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
