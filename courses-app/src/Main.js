import http from 'node:http';
import cluster from 'node:cluster';
import os from 'node:os';

import App from './app/App.js';
class Main {
	constructor() {
		this.port = process.env.PORT || 8000;
	}

	onError(server) {
		server.on('error', (error) => {
			if (error.code === 'EACCES') {
				console.log(`no access to port: ${this.port}`);
				process.exit(1);
			} else {
				throw error;
			}
		});
	}

	run() {
		if (cluster.isPrimary) {
			const numCPUs = os.cpus().length;
			console.log(`Master ${process.pid} is running`);

			for (let i = 0; i < numCPUs; i++) {
				cluster.fork();
			}
			// eslint-disable-next-line no-unused-vars
			cluster.on('exit', (worker, code, signal) => {
				console.log(`Worker ${worker.process.pid} died`);
				console.log('Forking a new worker');
				cluster.fork();
			});
		} else {
			const server = http.createServer(new App().getApp());
			this.onError(server);
			server.listen(this.port, () => {
				console.log(`Worker ${process.pid} started, listening on port ${this.port}`);
			});
		}
	}
}

new Main().run();
