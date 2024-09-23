
const express = require('express');
const userRoute = require('./routes/userroutes');
const mongoose = require('mongoose');
require('dotenv').config()
const port = process.env.PORT || 3000

const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('connected to db'))
.catch(err => console.log(err));

app.use('/items', userRoute);
app.listen(port,()=> {
    console.log(`server starting at http://localhost:${port}`)
})

