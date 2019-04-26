const express = require('express');
const router = express.Router();

// include controllers here
const boardsController = require('./controllers/boards');
const listsController = require('./controllers/lists');
const cardsController = require('./controllers/cards');

// include routes here
// routes for boards
router.get('/boards', boardsController.getBoards);
router.post('/boards', boardsController.createBoards);
router.put('/boards/:boardId', boardsController.updateBoards);
router.delete('/boards/:boardId', boardsController.deleteBoards);

// routes for lists
router.get('/lists/:boardId', listsController.getLists);
router.post('/lists/:boardId', listsController.createLists);
router.put('/lists/:listId', listsController.updateLists);
router.delete('/lists/:listId', listsController.deleteLists);

// routes for cards
router.get('/cards/:listId', cardsController.getCards);
router.post('/cards/:boardId/:listId', cardsController.createCards);
router.put('/cards/:cardId', cardsController.updateCards);
router.delete('/cards/:cardId', cardsController.deleteCards);
router.put('/cards/:cardId/add_comment', cardsController.addComments);
router.put('/cards/:cardId/move/:listId', cardsController.moveCards);


module.exports = router;