const { log } = require('console');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/DDatabase")
.then(()=>{console.log('connection okay');})
.catch((err)=>{console.log(err);});