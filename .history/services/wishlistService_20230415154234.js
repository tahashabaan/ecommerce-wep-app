const product = require('../modlas/productModal');


// @desc   del a  product from database
// @route  del api/v1/wishlist
// @acess  private
exports.addProductToWishList = asyncHandler( async(req, res, next) => {

    // product.wishlist.addToSet({})
    await product.findByIdAndUpdate(req.params.id,{ 
        $addToSet: { wishlist: {_id: } 
    }

    )
    
})