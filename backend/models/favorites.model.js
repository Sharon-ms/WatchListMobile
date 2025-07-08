const mongoose = require('mongoose');

const favoritesScheme = mongoose.Schema({
    "userName": String,
    "seriesId": mongoose.Types.ObjectId,
})

const favoritesModel = mongoose.model("favorite", favoritesScheme)

module.exports = favoritesModel