const validatorMiddlware = require('../../middlewares/validataor');
const {check } = require('express-validator');

exports.getcatagoryValidator = [
    check('id').isMongoId().withMessage('catagory not found'),
    validatorMiddlware
]

exports.createcatagoryValidator = [
    check('name').isLength({min:3}).withMessage('catagoryName must be  large then 3')
    .isLength({max:32}).withMessage('catagoryName must be less then 3'),
    validatorMiddlware
] 

exports.catagoryValidator = [
    check('name').isLength({min:3}).withMessage('catagoryName must be  large then 3')
    .isLength({max:32}).withMessage('catagoryName must be less then 3'),
    validatorMiddlware
] 