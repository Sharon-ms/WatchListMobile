const seriesModel = require('../models/series.model');

async function addSeries(req, res) {
    try {
        const series = req.body;
        const result = await seriesModel.create(series);
        res.status(200).send("series added successfuly");
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

async function getAllSeries(req, res) {
    try {
        const result = await seriesModel.find();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    addSeries,
    getAllSeries
}
