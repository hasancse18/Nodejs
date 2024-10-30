const express = require('express');
const app = express();
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json());




//import person data
const prouter = require('./routes/personRoutes')
//import menu data
const mrouter = require('./routes/menuRoutes')


app.use('/person',prouter)
app.use('/menu',mrouter)
app.listen(3000,()=>{
    console.log("Listening on port 3000")
})