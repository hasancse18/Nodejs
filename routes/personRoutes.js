const express = require('express');
const Person = require('./../Models/person');
const router = express.Router();
const  {jwtAuthenMiddleware,generateToken} = require('./../jwt')
//Add person scope
router.post('/signup',async (req,res)=>{
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data Saved')
        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload))
        const token = generateToken(payload);
        console.log('Token is: ',token)
        res.status(200).json({response: response, token: token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'})
        
    }
})
//login route
router.post('/login',async(req,res)=>{
    try {
        const {username, password}= req.body;
        const user = await Person.findOne({username: username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(404).json({error: 'Invalid username or Password'})
        }
        //generate token
        const payload = {
            id:user.id,
            username: user.username
        }
        const token = generateToken(payload)
        res.json({token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'})
        
    }
})
//get person
router.get('/',jwtAuthenMiddleware,async (req,res)=>{
    try {
        const response = await Person.find();
        console.log('Data fetched')
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'})
        
    }
})
//get person by their work type
router.get('/:workType',async (req,res)=>{
    try {
        const data = req.params.workType;
        const response = await Person.find({work: data});
        console.log('Data fetched')
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'})
        
    }
})
//Update person By their Id
router.put('/:id',async (req,res)=>{
    try {
        const Id = req.params.id;
        const data = req.body;
        const response = await Person.findByIdAndUpdate(Id,data,{
            new:true,
            runValidators: true
        })
        if(!response)
        {
            return res.status(404).json({error:'Id Not Found'})
        }
        console.log('Person Data Updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'})
        
    }
})
//Delete Person Data By Id
router.delete('/:id',async (req,res)=>{
    try {
        const Id = req.params.id;
        const response = await Person.findByIdAndDelete(Id);
        if(!response)
        {
            return res.status(404).json({error: 'Id not Found'});
        }
        console.log('Data Deleted');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'})
        
    }
})
module.exports = router;