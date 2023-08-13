const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const ApiError = require('../utilis/apiError');
const subcatagoryModal = require('../modlas/subcatagory');

exports.deleteFactory = (Model) => asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const  document = await Model.findByIdAndDelete(id);
    if(!document)
     return next(new ApiError(`${Model}  not found', 404`));
     res.status(200).json({message:`removed successfully ${id} `});
});
