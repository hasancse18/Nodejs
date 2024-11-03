const express = require('express');
const app = express();
const db = require('./db')
require('dotenv').config();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleDateString()}] Request Made to : ${req.orginalUrl}`)
    next();
}
app.use(logRequest);


//import person data
const prouter = require('./routes/personRoutes')
//import menu data
const mrouter = require('./routes/menuRoutes')

app.use('/person',prouter)
app.use('/menu',mrouter)

const port = process.env.PORT || 3000;
//MiddleWare Function


app.listen(port,()=>{
    console.log("Listening on port 3000")
})