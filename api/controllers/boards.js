const mongoose = require('mongoose'),
	BoardsModel = require('../models/boards'),
	ListsModel = require('../models/lists'),
	CardsModel = require('../models/cards'),
	logger = require('../lib/logger'),
	helper = require('../lib/helper');

module.exports = {

	// get all boards
	getBoards: (req, res) => {
		return BoardsModel.find()
			.then((boards) => {
				helper.successHandler(boards, req, res);
			})
			.catch((err) => {
				logger.logError(err, '1', 'getBoards', 'api/controllers/boards');
				helper.errorHandler(req, res);
			});
	},

	// create a new board
	createBoards: (req, res) => {
		const boardData = req.body;
		const newBoard = new BoardsModel(boardData);
		return newBoard
			.save()
			.then((boards) => {
				helper.successHandler(boards, req, res);
			})
			.catch((err) => {
				logger.logError(err, '1', 'createBoards', 'api/controllers/boards');
				helper.errorHandler(req, res);
			});
	},

	// update a existing board
	updateBoards: (req, res) => {
		const boardData = req.body;
		const boardId = req.params.boardId;
		return BoardsModel
			.findOneAndUpdate({ _id: boardId }, boardData)
			.then((boards) => {
				helper.successHandler(boards, req, res);
			})
			.catch((err) => {
				logger.logError(err, '1', 'updateBoards', 'api/controllers/boards');
				helper.errorHandler(req, res);
			});
	},

	// delete board
	deleteBoards: (req, res) => {
		const boardId = req.params.boardId;
		return BoardsModel
			.findOneAndRemove({ _id: boardId })
			.then((boards) => {
				ListsModel.deleteMany({ boardId })
					.then((lists) => {
						CardsModel.deleteMany({ boardId })
							.then((lists) => {

								helper.successHandler(boards, req, res);
							})
							.catch((err) => {
								logger.logError(err, '3', 'deleteBoards', 'api/controllers/boards');
								helper.errorHandler(req, res);
							});
					})
					.catch((err) => {
						logger.logError(err, '2', 'deleteBoards', 'api/controllers/boards');
						helper.errorHandler(req, res);
					});
			})
			.catch((err) => {
				logger.logError(err, '1', 'deleteBoards', 'api/controllers/boards');
				helper.errorHandler(req, res);
			});
	}
};