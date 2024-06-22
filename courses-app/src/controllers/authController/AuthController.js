import User from '../../models/user/User.js';
class AuthController {
	async register(req, res) {
		try {
			const { username, password } = req.body;
			const user = new User({ username, password });
			await user.save();
			res.status(201).send({ message: 'User registered successfully' });
		} catch (err) {
			res.status(500).send({ message: 'Error registering user', error: err.message });
		}
	}

	async login(req, res) {
		res.status(200).send({ token: 'JWT token' });
	}
}

export default AuthController;
