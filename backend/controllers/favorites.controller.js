const favoritesModel = require('../models/favorites.model')

async function addFavorite(req, res) {
    try {
        const { userName, seriesId } = req.body
        const result = await favoritesModel.create({ userName, seriesId });
        res.status(200).send(`${result} added`)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function getFavoritesOfUser(req, res) {
    try {
        const { userName } = req.params;
        const result = await favoritesModel.find({userName: userName})
        if(!result || result.length === 0){
            return res.status(404).send("not found");
        }
        res.status(200).send(result);
    }catch(err){
        res.status(500).send(err.message);
    }
}

module.exports = {
    getFavoritesOfUser,
    addFavorite
}