module.exports = {

    // get all cards
    getCards: (req, res) => {
        res.json({getCards:"getCards"})
    },

    // create a new card
    createCards: (req, res) => {
        res.json({createCards:"createCards"})
    },

    // update a existing card
    updateCards: (req, res) => {
        res.json({updateCards:"updateCards"})
    },

    // delete card
    deleteCards: (req, res) => {
        res.json({deleteCards:"deleteCards"})
    },

    // add comment
    addComments: (req, res) => {
        res.json({addComments:"addComments"});
    },

    // move card to other list
    moveCards: (req, res) => {
        res.json({moveCards:"moveCards"});
    }
};