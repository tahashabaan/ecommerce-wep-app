const slugify = require('slugify');
const asyncHandler = require('express-async-handler')
const brandModal = require('../modlas/brandModal');
const ApiError = require('../utilis/apiError');


// @desc       create brand modal
// @route      post api/v1/categories
// @access     public
exports.