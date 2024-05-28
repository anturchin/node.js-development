class AuthController {
	async register(req, res) {
		res.status(201).send({ message: 'User registered successfully' });
	}
	async login(req, res) {
		res.status(200).send({ token: 'JWT token' });
	}
}

export default new AuthController();
