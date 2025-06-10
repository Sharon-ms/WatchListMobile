const mongoose = require('mongoose');
const DB_URL = "mongodb+srv://user:123@cluster0.dhc8e.mongodb.net/watchList"

const connect = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("connect to DB")
    }
    catch(err) {
        console.error(err.message)
    }
}

module.exports = connect;

