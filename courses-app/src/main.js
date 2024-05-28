import http from 'node:http';
import express from 'express';

const app = express();

app.use((req, res) => {
	res.send('hello from express!');
});

const port = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(port, () => console.log('server is running...'));
