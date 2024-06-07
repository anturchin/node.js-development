import request from 'supertest';
import App from '../app/App.js';
import AppError from '../utils/AppError.js';

describe('AppError create instance', () => {
	test('should create an error with a message and status code', () => {
		const message = 'test message';
		const statusCode = 500;
		const error = new AppError(message, statusCode);

		expect(error.message).toBe(message);
		expect(error.statusCode).toBe(statusCode);
	});
});

describe('App Error Handling', () => {
	test('should return 404 for unknown routes', async () => {
		const response = await request(new App().getApp()).get('/unknown');
		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty('message', 'Cannot find path: /unknown on this server!');
	});
});
