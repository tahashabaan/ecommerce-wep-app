const asyncHandler = require('express-async-handler');

const ApiError = require('../utilis/apiError')
const shopingCart= require('../modlas/shopingCartModal');
const product= require('../modlas/productModal');




exports.addProductToShopingCart = asyncHandler( async(req, res, next) =>{
    const {productId,quantity, color } = req.body;
    const {price} = await product.findById(productId)
    let items =  await shopingCart.findOne({user: req.user._id});

    if(!items) {
      items = await shopingCart.create({
        user:req.user._id,
        cartItems:[{product:productId, price, color}]
      })
    } else {
      const cartItemIsFound =items.cartItems.findIndex(item => item.product.toString() === productId && item.color === color) 
      if(cartItemIsFound>-1) {
         items.cartItems[cartItemIsFound].quantity +=1;
        // const cartItem =  items.cartItems[cartItemIsFound];
        // cartItem.quantity +=1;
        // items.cartItems[cartItemIsFound]= cartItem;
     } else{
        items.cartItems.push({product:productId, price, color})
     }   
    }

    const totalPrice=items.cartItems.reduce(
        (accumulator, currentValue) =>
         accumulator + currentValue.price * currentValue.quantity,
       0);

    items.totalPrice=totalPrice;


    await items.save();
     res.status(201).json({
        status:true,
        message:'product added to your cart',
        data:items
    })
})

exports.getLogedUserDate =  asyncHandler(async(req, res, next) =>{
    const user = await shopingCart.findOne({user:req.user._id});
    if(!user)
       return next(new ApiError(`There is no cart for this user id : ${req.user._id}`,404));

    res.status(200).json({
      status: 'success',
      numOfCartItems: user.cartItems.length,
      data: user,
    });
})

exports.removeProductFromShopingCart = asyncHandler( async(req, res, next) =>{
    const cart = await shopingCart.findOneAndUpdate(
        { user: req.user._id },
        {
          $pull: { cartItems: { _id: req.params.itemId } },
        },
        { new: true }
      );

      cart.save();

      res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
      });
})

exports.clearProductFromCart = asyncHandler(async (req, res, next) =>{

    await shopingCart.findOneAndDelete({ user: req.user._id });

    res.status(201).json({
        status:true,
        message:'product removed from your cart',
    })
})