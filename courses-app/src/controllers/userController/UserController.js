import User from '../../models/user/User.js';

class UserController {
	async getAllUsers(req, res) {
		try {
			const users = await User.find();
			res.status(200).send(users);
		} catch (err) {
			res.status(500).send({ message: 'Error fetching users', error: err.message });
		}
	}
}

export default UserController;
