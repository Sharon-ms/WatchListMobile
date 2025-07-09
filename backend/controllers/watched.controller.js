const watchedModel = require('../models/watched.model');

async function markAsWatched(req, res) {
    try {
        const { userName, episodeId } = req.body;
        const result = await watchedModel.create({ userName, episodeId });
        res.status(200).send("mark as watched successfuly");
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

async function getAllWatched(req, res) {
    try {
        const result = await watchedModel.find();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

async function getWatchedOfUser(req, res) {
    try {
        const { id } = req.params;
        const result = await watchedModel.find({ userName: id });
        res.status(200).send(result)
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

async function deleteWatched(req, res) {
    try {
        const { id } = req.params;
        const result = await watchedModel.findOne({ _id: id });
        if (!result) {
            return res.status(404).send("episode not found")
        }
        await watchedModel.deleteOne(result);
        res.status(200).send("episode deleted")
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function deleteUserWatchList(req, res) {
    try {
        const { userName } = req.params;
        const result = await watchedModel.deleteMany({ userName });
        res.status(200).send(`Deleted ${result.deletedCount} records for user ${userName}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function deleteOneWatched(req, res) {
    try {
        const { userName, episodeId } = req.query;
        const result = await watchedModel.deleteOne({ userName: userName, episodeId: episodeId })
        res.status(200).send(`Deleted ${result.deletedCount} records for user ${userName}`)
    } catch (err) {
        res.status(200).send(err.message);
    }
}


module.exports = {
    markAsWatched,
    getAllWatched,
    getWatchedOfUser,
    deleteWatched,
    deleteUserWatchList,
    deleteOneWatched
}
