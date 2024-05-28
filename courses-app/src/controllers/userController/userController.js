class UserController {
	async getAllUsers(req, res) {
		res.status(200).send([{ username: 'sampleuser' }]);
	}
}

export default new UserController();
