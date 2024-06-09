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

describe('User API', () => {
    test('should fetch all users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
