import Course from '../../models/course/Course.js';

class CourseController {
	async getAllCourses(req, res) {
		try {
			const courses = await Course.find();
			res.status(200).send(courses);
		} catch (err) {
			res.status(500).send({ message: 'Error fetching courses', error: err.message });
		}
	}

	async createCourse(req, res) {
		try {
			const { title, description } = req.body;
			const course = new Course({ title, description });
			await course.save();
			res.status(201).send({ message: 'Course created successfully' });
		} catch (err) {
			res.status(500).send({ message: 'Error creating course', error: err.message });
		}
	}
}

export default CourseController;
