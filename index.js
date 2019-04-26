const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('index'))
	.listen(PORT, () => {
		console.log(`application started on port ${PORT}`);
	});

const bodyParser = require('body-parser');

app.post('/api/*', bodyParser.json());
app.put('/api/*', bodyParser.json());

// router
const apiRouter = require('./api/router')
app.use('/api', apiRouter);

// mongo connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/trello-anu', { useNewUrlParser: true });
// mongoose.Promise = global.Promise;
const db = mongoose.connection
	.on('error', (err) => {
		console.log(`Error: `, err)
	});