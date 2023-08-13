const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const ApiError = require('../utilis/apiError');
const subcatagoryModal = require('../modlas/subcatagory');


// @desc       get data from database
// @route      get api/v1/categories
// @access     public
exports.getSubcatacoryServices =asyncHandler(async(req, res) => {
    const page = req.query.page||1; 
    const limit = req.query.limit|| 5;
    const skip = (page-1) * limit;
    const subcatagory = await subcatagoryModal.find().limit(limit).skip(skip);
    res.status(201).json({result:subcatagory.length, page,data:subcatagory})
});

// @desc       add data from database
// @route      post api/v1/categories
// @access     public
exports.createSubcatacoryService = asyncHandler(async(req, res) => {
    const {name} = req.body;
    const subcatagory = await subcatagoryModal.create({name, slug:slugify(name), catagory:null});
    res.status(2002).json({data:subcatagory})
});

// @desc       get data from database
// @route      get api/v1/categories
// @access     public
exports.getSubcatacoryServiceById =asyncHandler(async(req, res) => {
   const {id} = req.params;
   const subcatagory = await subcatagoryModal.findById(id);
   res.status(202).json({data:subcatagory});
});

// @desc       updata data from database
// @route      put api/v1/categories
// @access     public
exports.updataSubcatacoryServiceById =asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const subcatagory = await subcatagoryModal.findByIdAndUpdate(id);
    if(!subcatagory) 
     next(new ApiError('subcatagory not found', 404));
    res.status(203).json({data:subcatagory});
});

// @desc       del data from database
// @route      del api/v1/categories
// @access     public
exports.removeSubcatacoryServiceById  =asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const  subcatagory = await subcatagoryModal.findByIdAndDelete(id);
    if(!subcatagory)
     next(new ApiError('subcatagory not found', 404));
     res.status(203).json({da)
});
