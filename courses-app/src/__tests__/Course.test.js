import request from 'supertest';
import App from '../app/App.js';

describe('Course API', () => {
	it('should fetch all courses', async () => {
		const response = await request(new App().getApp()).get('/courses');
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeInstanceOf(Array);
	});

	it('should create a new course', async () => {
		const response = await request(new App().getApp())
			.post('/courses')
			.send({
				title: 'Test Course',
				description: 'A course for testing',
				difficulty: 'easy',
				tags: ['test'],
			});
		expect(response.statusCode).toBe(201);
		expect(response.body).toHaveProperty('message', 'Course created successfully');
	});
});
