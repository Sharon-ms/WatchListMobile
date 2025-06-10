const usersModel = require('../models/users.model');

async function sighnUp(req, res) {
    try {
        const user = req.body;
        const result = await usersModel.create(user);
        res.status(200).send("sighn up successfuly");
    }
    catch (err) {
        res.status(500).send(err.mesage);
    }
};

async function getAllUsers(req, res) {
    try {
        const result = await usersModel.find();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err.mesage);
    }
};

module.exports = {
    sighnUp,
    getAllUsers
}
