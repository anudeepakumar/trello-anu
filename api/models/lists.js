const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ListsSchema = new Schema({
	boardId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Boards'
	},
	name: {
		type: String,
		required: true,
		max: 100
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Lists', ListsSchema);