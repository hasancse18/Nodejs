const mongoose = require('mongoose');
require('dotenv').config();
const mongoUrl = process.env.DB_URL;
 
mongoose.connect(mongoUrl)

const db = mongoose.connection;
db.on('connected',()=>{
    console.log("Database connected")
})

module.exports = db