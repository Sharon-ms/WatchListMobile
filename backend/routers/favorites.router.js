const express = require('express')
const favoritesController = require('../controllers/favorites.controller')
const router = express.Router();

router.get('/:userName', favoritesController.getFavoritesOfUser);

router.post('/', favoritesController.addFavorite)

module.exports = router