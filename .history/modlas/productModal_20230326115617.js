const mongoose = require('mongoose'); 


const productSchema = new mongoose.Schema({
  title:{
    type:String,
    unique:true,
    required:true,
    minLength:5
  },
  descripr
  rating:Number,
  mark:String,
  colors:Array,
  images:Array,


})