module.exports = {

    // get all lists
    getLists: (req, res) => {
        res.json({getLists:"getLists"})
    },

    // create a new list
    createLists: (req, res) => {
        res.json({createLists:"createLists"})
    },

    // update a existing list
    updateLists: (req, res) => {
        res.json({updateLists:"updateLists"})
    },

    // delete list
    deleteLists: (req, res) => {
        res.json({deleteLists:"deleteLists"})
    }
};