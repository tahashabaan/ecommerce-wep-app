const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartItems:[{
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'product'
    },
    price:Number,
    quantity:Number,
    color:String
  }],
  totalPrice:Number,
  totalPriceAfterDisCount:Number,
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'users'
  },
  coupon:{
    
  }
 
})


module.exports = mongoose.model('cart', cartSchema);