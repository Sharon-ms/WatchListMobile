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

async function getSeriesByTitle(req, res) {
    try{
        const {title} = req.params;
        const result = await seriesModel.find({title: title});
        if(result.length === 0){
            res.status(404).send("couldn't find a series whith that name")
        }
        res.status(200).send(result);
    }catch(err){
        res.status(500).send(err.message);
    }
}

async function updateSeries(req, res) {
    try{
        const {id} = req.params;
        const body = req.body;
        const seriesToUpdate = await seriesModel.findOneAndUpdate(
            {_id: id},
            {$set: body},
            {new: true}
        )
        if(!seriesToUpdate){
           return res.status(404).send("series not found")
        }
        res.status(200).send("series updeted")
    }catch(err){
        res.status(500).send(err.message);
    }
}

module.exports = {
    addSeries,
    getAllSeries,
    getSeriesByTitle,
    updateSeries
}
