const express = require('express');
const router = express.Router();
const menuItem = require('./../Models/menu');

//Add menu item
router.post('/',async (req,res)=>{
    try {
        const data = req.body
        const menuData = new menuItem(data);
        const response =await menuData.save();
        console.log('Data Added')
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'})
        
    }
})
//get the menu item
router.get('/',async (req,res)=>{
    try {
        const response = await menuItem.find();
        console.log('Data fetched')
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'})
        
    }
})
//Update an element
router.put('/:id',async (req,res)=>{
    try {
        const Id = req.params.id;
        const data = req.body;
        const response = await menuItem.findByIdAndUpdate(Id,data,{
            new: true,
            runValidators: true
        });
        if(!response){
            return res.status(404).json({error: 'Menu Not Found'})
        }
        console.log('Data Updated')
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'})
        
    }
})
//Delete An Element

router.delete('/:id',async (req,res)=>{
    try {
        const Id = req.params.id;
        const response = await menuItem.findByIdAndDelete(Id)
        if(!response){
            return res.status(404).json({error: 'Menu Not Found'})
        }
        console.log('Data Delted');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server Error'})
        
    }
})




module.exports = router;