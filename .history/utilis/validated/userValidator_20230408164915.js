const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/errorMiddleware');
const User = require('../../modlas/userModal');


exports.createUserValidator = [
  check('name')
    .notEmpty()
    .withMessage('Product required')
    .trim()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('email')
    .isEmail()
    .withMessage('email is not  valid')
    .notEmpty()
    .withMessage('email is required')
    .custom(val =>  {
      User.find({email: val}).then( user => {
         if (user) 
           return Promise.reject(new Error('E-mail already in user'))
      })
    }),

  check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('min password is 6 characters')
    .custom((val, {req}) => {
      if (val !== req.body.passwordConfirm)
       return Promise.reject(new Error('password not confirmed'))
    }),
  check('passwordConfirm')
    .notEmpty()
    .withMessage('passwordConfirm is required '),
  
    check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-AE', 'ar-SA'])
    .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),

    check('profileImg').optional(),
    check('role').optional(),
  validatorMiddleware
];

exports.updataPasswordUserValidator = [
   check('id').isMongoId().withMessage('id not valid'),
   check()
   validatorMiddleware
]

exports.getUserValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  body('title')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];