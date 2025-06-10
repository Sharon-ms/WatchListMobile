const mongoose = require('mongoose');

const seriesScheme = mongoose.Schema({
    "title": String,
    "image": String,
    "genre": String,
    "year": String,
    "seasonsAmount": Number
})

const seriesModel = mongoose.model("serie", seriesScheme);

module.exports = seriesModel;