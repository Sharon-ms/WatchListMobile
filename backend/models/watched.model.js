const mongoose = require('mongoose');

const watchedScheme = mongoose.Schema({
    "userName": String,
    "episodeID": mongoose.Types.ObjectId,
})

const watchedModel = mongoose.model("watched", watchedScheme);

module.exports = watchedModel;