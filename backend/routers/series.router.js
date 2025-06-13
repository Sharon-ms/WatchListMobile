const express = require("express");
const seriesController = require('../controllers/series.controller');

const router = express.Router();

router.get('/', seriesController.getAllSeries);

router.get('/:title', seriesController.getSeriesByTitle);

router.post('/', seriesController.addSeries);

router.put('/:id', seriesController.updateSeries);

// router.delete('/:id');

module.exports = router;