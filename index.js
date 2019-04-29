const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static('client/build'))
	.listen(PORT, () => {
		console.log(`application started on port ${PORT}`);
	});

const bodyParser = require('body-parser');

app.post('/api/*', bodyParser.json());
app.put('/api/*', bodyParser.json());

// router
const apiRouter = require('./api/router')
app.use('/api', apiRouter);

app.use('*', (req, res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')))

// mongo connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost:27017/trello-anu', { useNewUrlParser: true });
// mongoose.Promise = global.Promise;
const db = mongoose.connection
	.on('error', (err) => {
		console.log(`Error: `, err)
	});