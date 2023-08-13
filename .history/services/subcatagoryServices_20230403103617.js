const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const ApiError = require('../utilis/apiError');
const subcatagoryModal = require('../modlas/subcatagory');
const {
  getDocuments,
  createDocument,
  getDocumentById,
  updataDocumentById,
  deleteDocumentById} =require('./handle/handlersFactory')

exports.setCatagoryIdToBody = (req, res, next) => {
if(!req.body.catagory)  req.body.catagory = req.params.catagoryId;
 next();
}

exports.filterObj = (req, res, next) => {
  let filterObj ={};
  if (req.params.catagoryId) filterObj={catagory:req.params.catagoryId};
  req.filterObj = filterObj;
   next();
  }
// @desc       get data from database
// @route      get api/v1/categories
// @access     public
exports.getSubcatacoryServices =asyncHandler(async(req, res) => {
    const page = req.query.page * 1||1; 
    const limit = req.query.limit * 1|| 7;
    const skip = (page-1) * limit;
    // let filterObj ={};
    // if (req.params.catagoryId) filterObj={catagory:req.params.catagoryId};

    const subcatagory = await subcatagoryModal.find(req.filterObj).limit(limit).skip(skip);
    res.status(201).json({result:subcatagory.length, page,data:subcatagory})
});

// @desc       add data from database
// @route      post api/v1/categories
// @access     private
exports.createSubcatacoryService = createDocument(subcatagoryModal)

// @desc       get data from database
// @route      get api/v1/categories
// @access     public
exports.getSubcatacoryServiceById =getDocumentById(subcatagoryModal)
// @desc       updata data from database
// @route      put api/v1/categories
// @access     public
exports.updataSubcatacoryServiceById =updataDocumentById(subcatagoryModal)

// @desc       del data from database
// @route      del api/v1/categories
// @access     public
exports.removeSubcatacoryServiceById  =deleteDocumentById(subca)
