const express = require("express");
const episodesController = require('../controllers/episodes.controller');

const router = express.Router();

router.get('/', episodesController.getAllEpisodes);

// router.get('/:id');

router.post('/', episodesController.addEpisode);

// router.put('/:id');

// router.delete('/:id');

module.exports = router;