const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CardsSchema = new Schema({
	boardId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Boards'
	},
	listId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Lists'
	},
	name: {
		type: String,
		required: true,
		max: 100
	},
	description: {
		type: String,
		required: true,
		max: 1000
	},
	comments: [{
		body: String,
		date: Date
	}],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Cards', CardsSchema);