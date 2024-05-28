import request from 'supertest';
import app from '../app.js';

describe('Auth API', () => {
	it('should register a new user', async () => {
		const response = await request(app)
			.post('/api/auth/register')
			.send({ username: 'testuser', email: 'testuser@example.com', password: 'password' });
		expect(response.statusCode).toBe(201);
		expect(response.body).toHaveProperty('message', 'User registered successfully');
	});

	it('should login a user', async () => {
		const response = await request(app)
			.post('/api/auth/login')
			.send({ email: 'testuser@example.com', password: 'password' });
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('token');
	});
});
