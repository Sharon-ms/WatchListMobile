const watchedModel = require('../models/watched.model');

async function markAsWatched(req, res) {
    try {
        const watched = req.body;
        const result = await watchedModel.create(watched);
        res.status(200).send("mark as watched successfuly");
    }
    catch (err) {
        res.status(500).send(err.mesage);
    }
};

async function getAllWatched(req, res) {
    try {
        const result = await watchedModel.find();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err.mesage);
    }
};

async function getWatchedOfUser(req, res){
    try{
        const {id} = req.params;
        const result = await watchedModel.find({userName: id});
        res.status(200).send(result)
    }
    catch (err) {
        res.status(500).send(err.mesage);
    }

}

module.exports = {
    markAsWatched,
    getAllWatched,
    getWatchedOfUser
}
