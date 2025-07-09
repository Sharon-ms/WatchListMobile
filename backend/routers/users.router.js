const express = require("express");
const path = require('path')
const multer = require('multer')
const usersController = require('../controllers/users.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) =>{
        console.log("userName from params:", req.params.userName);
        cb(null, `${req.params.userName}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage})

const router = express.Router();

router.get('/', usersController.getAllUsers);

router.get('/:userName', usersController.getUserById);

router.post('/', usersController.sighnUp);

router.put('/:userName', usersController.updateUserPassword);

router.put('/photo/:userName',upload.single('photo'), usersController.updateUserPhoto)

router.delete('/:userName', usersController.deleteUser);

module.exports = router;