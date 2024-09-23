const express = require ('express');
const Item = require('../models/item');

const getItems = async (req, res) => { 
    try {
        const item = await Item.findById(req.params.id);
        res.json(item)
        } catch(error) {
            res.status(400).send("Invalid ID")
        }
    };

const  createItem = async (req,res)=> {
        const newItem =  new Item({
         name: req.body.name,
         price: req.body.price
        })
        try {
         const savedItem = await newItem.save()
         res.status(201).json(newItem)
        }
        catch(error){
         res.status(400).send ("Bad request")
        }
        }

const    getItem =async (req, res) => {
        const items = await Item.find()
        res.json(items)
    }    

 const   updateItem = async (req,res)=> {
        try{
            const updatedItem = await Item.findByIdAndUpdate(
                req.params.id,
                {name: req.body.name},
                {new: true,runValidators:true}
            ) 
            res.send(updatedItem)
            }
            catch(error){
                res.status(400).send("Invalid ID")
            }
        }

const    deleteItem =async (req,res)=> {
        try {
        const deleltedItem = await Item.findByIdAndDelete(req.params.id);
        if(!deleltedItem) return res.status (404).send('Item not found');
    res.status(204).send();
    }
    catch(error){
        res.status(400).send("Invalid ID")
    }
    }

module.exports ={
    getItems,
    createItem,
    getItem,
    updateItem,
    deleteItem
}
