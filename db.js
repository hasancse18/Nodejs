const mongoose = require('mongoose');
require('dotenv').config();
const mongoUrl = process.env.DB_URL;
//const mongoUrl = 'mongodb://localhost:27017/mydb';
//const mongoUrl = 'mongodb+srv://hasancse:hasancse@cluster0.ckt9f.mongodb.net/' 
mongoose.connect(mongoUrl)

const db = mongoose.connection;
db.on('connected',()=>{
    console.log("Database connected")
})

module.exports = db