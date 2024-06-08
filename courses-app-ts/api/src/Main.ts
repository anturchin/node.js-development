import http from 'node:http';
import cluster from 'node:cluster';
import os from 'node:os';

import App from './app/App';

class Main {
    private port: number;

    constructor() {
        this.port = parseInt(process.env.PORT || '', 10) || 8000;
    }

    public run(): void {
        if (cluster.isPrimary) {
            const numCPUs = os.cpus().length;
            console.log(`Master ${process.pid} is running`);

            for (let i = 0; i < numCPUs; i += 1) {
                cluster.fork();
            }
        } else {
            const server = http.createServer(new App().getApp());
            this.onError(server);
            server.listen(this.port, () => {
                console.log(`Worker ${process.pid} started, listening on port ${this.port}`);
            });
        }
    }

    private onError(server: http.Server): void {
        server.on('error', (error: NodeJS.ErrnoException) => {
            if (error.code === 'EACCES') {
                console.log(`no access to port: ${this.port}`);
                process.exit(1);
            } else {
                throw error;
            }
        });
    }
}

new Main().run();
