const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BoardsSchema = new Schema({
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

module.exports = mongoose.model('Boards', BoardsSchema);