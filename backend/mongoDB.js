require('dotenv').config()
const mongoose = require('mongoose');
const DB_URL = process.env.DB_LINK
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

