const mongoose = require('mongoose');

const episodesScheme = mongoose.Schema({
    "title": String,
    "seasonNum": Number,
    "episodeNum": Number,
    "seriesId": mongoose.Types.ObjectId
})

const episodesModel = mongoose.model("episode", episodesScheme);

module.exports = episodesModel;