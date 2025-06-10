const episodesModel = require('../models/episodes.model');

async function addEpisode(req, res) {
    try {
        const episode = req.body;
        const result = await episodesModel.create(episode);
        res.status(200).send("episode added successfuly");
    }
    catch (err) {
        res.status(500).send(err.mesage);
    }
};

async function getAllEpisodes(req, res) {
    try {
        const result = await episodesModel.find();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err.mesage);
    }
};

module.exports = {
    addEpisode,
    getAllEpisodes
}
