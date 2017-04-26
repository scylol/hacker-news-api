const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {
	DATABASE,
	PORT
} = require('./config');

const app = express();

app.use(morgan(':method :url :res[location] :status'));

app.use(bodyParser.json());

// ADD ENDPOINTS HERE

app.post('/api/stories', (req, res) => {
	const requiredFields = ['title', 'url'];
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body`;
			console.log(message);
			return res.status(400)
				.send(message);
		}
	}
	knex('article')
		.insert({
			title: req.body.title,
			url: req.body.url
		})
		.then(() => {
			const message = `Your post titled ${req.body.title} can be found at ${req.body.url}`;
			res.status(201)
				.json(message);
		});
});

app.get('/api/stories', (req, res) => {
	knex.select('title', 'url', 'votes')
		.from('article')
		.orderBy('votes', 'desc')
		.limit(20)
		.then((results) => {
			res.status(200)
				.json(results);
		});

});

app.put('/api/stories/:postid', (req, res) => {
	let id = req.params.postid;
	knex('article')
        .where('id', id)
        .increment('votes', 1)
        .then(() => {
	res.status(204);
});
});

let server;
let knex;

function runServer(database = DATABASE, port = PORT) {
	return new Promise((resolve, reject) => {
		try {
			knex = require('knex')(database);
			server = app.listen(port, () => {
				console.info(`App listening on port ${server.address().port}`);
				resolve();
			});
		} catch (err) {
			console.error(`Can't start server: ${err}`);
			reject(err);
		}
	});
}

function closeServer() {
	return knex.destroy()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing servers');
				server.close(err => {
					if (err) {
						return reject(err);
					}
					resolve();
				});
			});
		});
}

if (require.main === module) {
	runServer()
		.catch(err => {
			console.error(`Can't start server: ${err}`);
			throw err;
		});
}

module.exports = {
	app,
	runServer,
	closeServer
};
