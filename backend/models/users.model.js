const mongoose = require('mongoose');

const usersScheme = mongoose.Schema({
    "name": String,
    "userName": String,
    "password": String,
    "photo": String
})

const userModel = mongoose.model("user", usersScheme);

module.exports = userModel;