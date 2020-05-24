// Import packages and files
const express = require('express');
const next = require('next');
const server = require('./graphql');
const dotenv = require('dotenv');

dotenv.config();

const nextApp = next({ dev: process.env.NODE_ENV === 'development', dir: './next' });
const handler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
	const app = express();
	app.use(express.json());

	server.applyMiddleware({ app, path: '/graphql' });

	app.get('*', (req, res) => {
		return handler(req, res);
	});

	// Start
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Express is listening on port ${PORT}`);
	});
});
