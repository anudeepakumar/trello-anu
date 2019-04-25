const mongoose = require('mongoose');
const BoardsModel = require('../models/boards');

module.exports = {

    // get all boards
    getBoards: (req, res) => {
        BoardsModel.find().then((boards) => {res.send(boards)}).catch((err) => {res.status(500)});
        // res.json({getBoards:"getBoards"})
    },

    // create a new board
    createBoards: (req, res) => {
        res.json({createBoards:"createBoards"})
    },

    // update a existing board
    updateBoards: (req, res) => {
        res.json({updateBoards:"updateBoards"})
    },

    // delete board
    deleteBoards: (req, res) => {
        res.json({deleteBoards:"deleteBoards"})
    }
};