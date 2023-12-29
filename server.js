

const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//import routes
const postRoutes = require('./routes/posts');

//app midleware
app.use(bodyParser.json());

//route midleware
app.use(postRoutes);

const PORT = 8000;
const DB_URL = 'mongodb+srv://johnwilli9910:eEMqs3SCt2K0XChW@mernapp.d4hbnpu.mongodb.net/';
mongoose.connect(DB_URL)
.then(() => {
    console.log('DB is connected');
})
.catch((err)=>console.log('DB connection error',err));

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
});


