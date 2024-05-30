import http from 'node:http';
import App from './app/App.js';
class Main {
	constructor() {
		this.port = process.env.PORT || 8000;
		this.server = http.createServer(new App().getApp());
		this.run();
		this.onError();
	}

	onError() {
		this.server.on('error', (error) => {
			if (error.code === 'EACCES') {
				console.log(`no access to port: ${this.port}`);
			}
		});
	}

	run() {
		this.server.listen(this.port, () => console.log(`server is running on port ${this.port}`));
	}
}

new Main();
