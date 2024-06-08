import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import App from '../app/App';

describe('User API', () => {
    test('should fetch all users', async () => {
        const response = await request(new App().getApp()).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
