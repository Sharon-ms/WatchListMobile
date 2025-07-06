const usersModel = require('../models/users.model');

async function sighnUp(req, res) {
    try {
        const user = req.body;
        const result = await usersModel.create(user);
        res.status(200).send("sighn up successfuly");
    }
    catch (err) {
        res.status(500).send(err.message);
        console.log(err.message);
    }
};

async function getAllUsers(req, res) {
    try {
        const result = await usersModel.find();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err.message);
        console.log(err.message);
    }
};

async function getUserById(req, res) {
    try {
        const { userName } = req.params;
        const result = await usersModel.findOne({ userName: userName });
        if (!result) {
            res.status(404).send("user dosn't exist")
        }
        else {
            res.status(200).send(result)
        }
    }
    catch (err) {
        res.status(500).send(err.message);
        console.log(err.message);
    }

}

async function updateUserPassword(req, res) {
    try {
        const { userName } = req.params;
        const { newPassword } = req.body;
        const changeUserPassword = await usersModel.findOneAndUpdate(
            { userName: userName },
            { password: newPassword },
            { new: true }
        )
        if (!changeUserPassword) {
            res.status(404).send("user not found")
        }
        res.status(200).send("password changed")
    } catch (err) {
        res.status(500).send(err.message);
        console.log(err.message);
    }
}

async function deleteUser(req, res) {
    try {
        const { userName } = req.params;
        const userToDelete = await usersModel.findOne({ userName: userName })
        if (!userToDelete) {
            res.status(404).send("user not found");
        }
        else {
            await usersModel.deleteOne(userToDelete);
            res.status(200).send("user delete");
        }

    } catch (err) {
        res.status(500).send(err.message);
        console.log(err.message);
    }
}

module.exports = {
    sighnUp,
    getAllUsers,
    getUserById,
    updateUserPassword,
    deleteUser
}
