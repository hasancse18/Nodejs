const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/mydb';
mongoose.connect(mongoUrl)

const db = mongoose.connection;
db.on('connected',()=>{
    console.log("Database connected")
})

module.exports = db