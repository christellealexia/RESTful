const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chichi:test1234@cluster0.odoac.mongodb.net/restful?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('connected to db'))
.catch(err => console.log(err));

const ItemSchema = new mongoose.Schema({
    name: String,
    price: Number
})
const Item = mongoose.model("Item", ItemSchema);


app.get ('/items', async (req, res) => {
    const items = await Item.find()
    res.json(items)
})

app.get("/items/:id", async (req, res) => {
    try {
    const item = await Item.findById(req.params.id);
    res.json(item)
    } catch(error) {
        res.status(400).send("Invalid ID")
    }
});

app.post('/items', async (req,res)=> {
   const newItem = ( {
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
)

app.put('/items/:id', async (req,res)=> {
try{
    const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        {name: req.body.name},
        {new: true,runValidators:true}
    ) 
    }
    catch(error){
        res.status(400).send("Invalid ID")
    }
})

app.delete('/items/:id', async (req,res)=> {
    try {
    const deleltedItem = await Item.findByIdAndDelete(req.params.id);
    if(!deleltedItem) return res.status (404).send('Item not found');
res.status(204).send();
}
catch(error){
    res.status(400).send("Invalid ID")
}
})

app.listen(port,()=> {
    console.log(`server starting at http://localhost:${port}`)
})

