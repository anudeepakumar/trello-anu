const mongoose = require('mongoose'),
	ListsModel = require('../models/lists'),
	CardsModel = require('../models/cards'),
	logger = require('../lib/logger'),
	helper = require('../lib/helper');

module.exports = {

	// get all lists
	getLists: (req, res) => {
		const boardId = req.params.boardId;
		return ListsModel.find({ boardId })
			.then((lists) => {
				helper.successHandler(lists, req, res);
			})
			.catch((err) => {
				logger.logError(err, '1', 'getLists', 'api/controllers/lists');
				helper.errorHandler(req, res);
			});
	},

	// get one list with Id
	getList: (req, res) => {
		const listId = req.params.listId;
		return ListsModel.findById(listId)
			.then((lists) => {
				helper.successHandler(lists, req, res);
			})
			.catch((err) => {
				logger.logError(err, '1', 'getList', 'api/controllers/lists');
				helper.errorHandler(req, res);
			});
	},

	// create a new list
	createLists: (req, res) => {
		const boardId = req.params.boardId;
		const listData = req.body;
		listData.boardId = boardId;
		const newList = new ListsModel(listData);
		return newList
			.save()
			.then((lists) => {
				helper.successHandler(lists, req, res);
			})
			.catch((err) => {
				logger.logError(err, '1', 'createLists', 'api/controllers/lists');
				helper.errorHandler(req, res);
			});
	},

	// update a existing list
	updateLists: (req, res) => {
		const listData = req.body;
		const listId = req.params.listId;
		return ListsModel
			.findOneAndUpdate({ _id: listId }, listData)
			.then((lists) => {
				helper.successHandler(lists, req, res);
			})
			.catch((err) => {
				logger.logError(err, '1', 'updateLists', 'api/controllers/lists');
				helper.errorHandler(req, res);
			});
	},

	// delete list
	deleteLists: (req, res) => {
		const listId = req.params.listId;
		return ListsModel
			.findOneAndRemove({ _id: listId })
			.then((lists) => {
				CardsModel.deleteMany({ listId })
					.then((cards) => {
						helper.successHandler(lists, req, res);
					})
					.catch((err) => {
						logger.logError(err, '2', 'deleteBoards', 'api/controllers/lists');
						helper.errorHandler(req, res);
					});
			})
			.catch((err) => {
				logger.logError(err, '1', 'deleteLists', 'api/controllers/lists');
				helper.errorHandler(req, res);
			});
	}
};