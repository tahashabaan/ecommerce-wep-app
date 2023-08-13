const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const ApiError = require('../utilis/apiError');
const subcatagoryModal = require('../modlas/subcatagory');


// @desc       get data from database
// @route      get api/v1/categories
// @access     public
exports.getSubcatacoryServices =asyncHandler( as(req, res) => {
    subcatagoryModal.find()
};)

// @desc       add data from database
// @route      post api/v1/categories
// @access     public
exports.createSubcatacoryService = (req, res) => {}

// @desc       get data from database
// @route      get api/v1/categories
// @access     public
exports.getSubcatacoryServiceById = (req, res) => {}

// @desc       updata data from database
// @route      put api/v1/categories
// @access     public
exports.updataSubcatacoryServiceById = (req, res) => {}

// @desc       del data from database
// @route      del api/v1/categories
// @access     public
exports.removeSubcatacoryServiceById = (req, res) => {}
