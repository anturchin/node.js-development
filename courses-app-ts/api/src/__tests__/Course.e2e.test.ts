// import { describe, expect, test } from '@jest/globals';
// import request from 'supertest';
// import App from '../app/App';

// describe('Course API', () => {
//     test('should fetch all courses', async () => {
//         const response = await request(new App().getApp()).get('/api/courses');
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toBeInstanceOf(Array);
//     });

//     test('should create a new course', async () => {
//         const response = await request(new App().getApp())
//             .post('/api/courses')
//             .send({
//                 title: 'Test Course',
//                 description: 'A course for testing',
//                 difficulty: 'easy',
//             });
//         expect(response.statusCode).toBe(201);
//         expect(response.body).toHaveProperty('message', 'Course created successfully');
//     });
// });
