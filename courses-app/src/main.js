import http from 'node:http';
import App from './app/App.js';
class Main {
	constructor() {
		this.port = process.env.PORT || 8000;
		this.app = new App();
		this.server = http.createServer(this.app.getApp());
		this.run();
	}

	run() {
		this.server.listen(this.port, () => console.log('server is running...'));
	}
}

new Main();
