import request from 'supertest';
import app from '../app.js';

describe('Course API', () => {
	it('should fetch all courses', async () => {
		const response = await request(app).get('/api/courses');
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeInstanceOf(Array);
	});

	it('should create a new course', async () => {
		const response = await request(app)
			.post('/api/courses')
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
