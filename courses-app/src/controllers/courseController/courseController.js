class CourseController {
	async getAllCourses(req, res) {
		res.status(200).send([{ title: 'Sample Course' }]);
	}

	async createCourse(req, res) {
		res.status(201).send({ message: 'Course created successfully' });
	}
}

export default new CourseController();
