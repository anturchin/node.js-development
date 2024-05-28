import request from 'supertest';
import app from '../app.js';

describe('User API', () => {
	it('should fetch all users', async () => {
		const response = await request(app).get('/api/users');
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeInstanceOf(Array);
	});
});
