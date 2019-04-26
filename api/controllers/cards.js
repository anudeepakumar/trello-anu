const mongoose = require('mongoose'),
	CardsModel = require('../models/cards'),
	logger = require('../lib/logger'),
	helper = require('../lib/helper');

module.exports = {

	// get all cards
	getCards: (req, res) => {
		const listId = req.params.listId;
		return CardsModel.find({ listId })
			.then((cards) => {
				helper.successHandler(cards, req, res);
			})
			.catch((err) => {
				logger.logError(err, '1', 'getCards', 'api/controllers/cards');
				helper.errorHandler(req, res);
			});
	},

	// create a new card
	createCards: (req, res) => {
		const listId = req.params.listId;
		const boardId = req.params.boardId;
		let cardData = req.body;
		cardData = { ...cardData, boardId, listId };
		const newCard = new CardsModel(cardData);
		return newCard
			.save()
			.then((cards) => {
				helper.successHandler(cards, req, res);
			})
			.catch((err) => {
				logger.logError(err, '1', 'createCards', 'api/controllers/cards');
				helper.errorHandler(req, res);
			});
	},

	// update a existing card
	updateCards: (req, res) => {
		const cardData = req.body;
		const cardId = req.params.cardId;
		return CardsModel
			.findOneAndUpdate({ _id: cardId }, cardData)
			.then((cards) => {
				helper.successHandler(cards, req, res);
			})
			.catch((err) => {
				logger.logError(err, '1', 'updateCards', 'api/controllers/cards');
				helper.errorHandler(req, res);
			});
	},

	// delete card
	deleteCards: (req, res) => {
		const cardId = req.params.cardId;
		return CardsModel
			.findOneAndRemove({ _id: cardId })
			.then((cards) => {
				helper.successHandler(cards, req, res);
			})
			.catch((err) => {
				logger.logError(err, '1', 'deleteCards', 'api/controllers/cards');
				helper.errorHandler(req, res);
			});
	},

	// add comment
	addComments: (req, res) => {
		const commmentData = req.body;
		const cardId = req.params.cardId;
		return CardsModel
			.findById(cardId)
			.then((card) => {
				card.comments.push(commmentData)
				CardsModel
					.findOneAndUpdate({ _id: card._id }, { comments: card.comments })
					.then((cards) => {
						helper.successHandler(cards, req, res);
					})
					.catch((err) => {
						logger.logError(err, '2', 'addComments', 'api/controllers/cards');
						helper.errorHandler(req, res);
					});
			})
			.catch((err) => {
				logger.logError(err, '1', 'addComments', 'api/controllers/cards');
				helper.errorHandler(req, res);
			});
	},

	// move card to other card
	moveCards: (req, res) => {
		const cardId = req.params.cardId;
		const listId = req.params.listId;
		return CardsModel
			.findOneAndUpdate({ _id: cardId }, { listId })
			.then((cards) => {
				helper.successHandler(cards, req, res);
			})
			.catch((err) => {
				logger.logError(err, '1', 'moveCards', 'api/controllers/cards');
				helper.errorHandler(req, res);
			});
	}
};