import http from 'node:http';
import app from './app.js';
class Main {
	constructor() {
		this.port = process.env.PORT || 8000;
		this.server = http.createServer(app);
		this.run();
	}

	run() {
		this.server.listen(this.port, () => console.log('server is running...'));
	}
}

new Main();
