const episodesModel = require('../models/episodes.model');

async function addEpisode(req, res) {
    try {
        const episode = req.body;
        const result = await episodesModel.create(episode);
        res.status(200).send("episode added successfuly");
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

async function getAllEpisodes(req, res) {
    try {
        const { seriesId, seasonNum } = req.query;
        let filter = {};
        if (seriesId) filter.seriesId = seriesId;
        if (seasonNum) filter.seasonNum = seasonNum;
        const result = await episodesModel.find(filter);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

async function getEpisodeById(req, res) {
    try {
        const { id } = req.params;
        const result = await episodesModel.findOne({ _id: id })
        if (!result) {
            return res.status(404).send("not found")
        }
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    addEpisode,
    getAllEpisodes,
    getEpisodeById
}
