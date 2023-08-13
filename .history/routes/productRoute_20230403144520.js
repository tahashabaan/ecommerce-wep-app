const express = require('express');

const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator
    }=require('../utilis/validated/productValidator');
const {
    createProduct,
    getProduct, 
    getProductByID,
    updataProductByID, 
    deleteProductByID,
    uploadProductImages,
    filterProductImages  }=require('../services/productService');

  const router = express.Router();

  router.route('/').get(getProduct).post(
    uploadProductImages,
    filterProductImages,
    createProductValidator,
    createProduct);
  router.route('/:id')
  .get(getProductValidator,  getProductByID)
  .put(
    uploadProductImages,
    filterProductImages,
    updateProductValidator, 
    updataProductByID)
  .delete(deleteProductValidator, deleteProductByID);

  module.exports = router;