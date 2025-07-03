const express = require("express");
const watchedController = require('../controllers/watched.controller');

const router = express.Router();

router.get('/', watchedController.getAllWatched);

router.get('/:id', watchedController.getWatchedOfUser);


// router.get('/:id');

router.post('/', watchedController.markAsWatched);

// router.put('/:id');

router.delete('/:userName', watchedController.deleteUserWatchList);

router.delete('/', watchedController.deleteOneWatched)

module.exports = router;