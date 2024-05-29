import request from 'supertest';
import App from '../app/App.js';

describe('User API', () => {
	it('should fetch all users', async () => {
		const response = await request(new App().getApp()).get('/users');
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeInstanceOf(Array);
	});
});
