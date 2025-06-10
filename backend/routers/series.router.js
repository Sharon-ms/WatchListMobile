const express = require("express");
const seriesController = require('../controllers/series.controller');

const router = express.Router();

router.get('/', seriesController.getAllSeries);

// router.get('/:id');

router.post('/', seriesController.addSeries);

// router.put('/:id');

// router.delete('/:id');

module.exports = router;