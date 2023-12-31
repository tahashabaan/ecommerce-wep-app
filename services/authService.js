/* eslint-disable arrow-body-style */
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ApiError = require('../utilis/apiError');
const userModel = require('../modlas/userModal');
const sendEmail = require('../utilis/sendEmail')

const createToken = (payload) => {
  return jwt.sign(
    {userId:payload},
     process.env.JWT_SECRET_KEY, 
    {expiresIn:process.env.JWT_EXPIRE_TIME})
}

exports.signUp =asyncHandler(async(req, res, next) => {
// create user
 const user = await userModel.create({
  name:req.body.name,
  email:req.body.email,
  password:req.body.password
})
 // create token
 const token = await createToken(user._id);
 res.status(201).json({data:user, token})
})

exports.signIn =asyncHandler(async(req, res, next) => {
  // search on email
 const user =await userModel.findOne({email:req.body.email});
 if(!user || ! await bcrypt.compare(req.body.password, user.password) ) { 
   return next(new ApiError('user or password not valid', 404))
 }
 // create token
 const token = await createToken(user._id);
 res.status(201).json({data:user, token})
})

exports.protect = asyncHandler(async(req, res, next) => {
    // 1) Check if token exist, if exist get
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split('/')[1];
    }
    if (!token) {
      return next(
        new ApiError(
          'You are not login, Please login to get access this route',
          401
        )
      );
    }

 
   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
 
   const currenUser = await userModel.findById(decoded.userId);

   // user found or not
   if(!currenUser) 
       return next(new ApiError('not find user of this token', 404));

   // changepassword
   if (currenUser.passwordChangedAt){
      const changePasswordAt = parseInt( currenUser.passwordChangedAt.getTime()/1000, 10);
     if(changePasswordAt > decoded.iat)
        return next(new ApiError('the password is changed aleerdy', 402));
      }

  req.user = currenUser;
  next();
})


// recive roles then check it
exports.allowTo = (...roles) =>
   asyncHandler(async(req, res, next) => {
     if (!roles.includes(req.user.role))
        return next(new ApiError('You are not allowed to access this route', 402));

       next();
})


exports.forgetPassword = asyncHandler(async (req, res, next) => {
 // check user
    const user =  await userModel.find({email:req.body.email});
    if(!user)
      return next(new ApiError(`not found user this email:${req.body.email}`, 402));

     const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
     const hashedResetCode = crypto
       .createHash('sha256')
       .update(resetCode)
       .digest('hex');

       user.passwordResetCode = hashedResetCode;
       // Add expiration time for password reset code (10 min)
       user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
       user.passwordResetVerified = false;

       const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
       try {
         await sendEmail({
           email: user.email,
           subject: 'Your password reset code (valid for 10 min)',
           message,
         });
       } catch (err) {
         user.passwordResetCode = undefined;
         user.passwordResetExpires = undefined;
         user.passwordResetVerified = undefined;
     
         await user.save();
         return next(new ApiError('There is an error in sending email', 500));
       }
     
       res
         .status(200)
         .json({ status: 'Success', message: 'Reset code sent to email' });
})

exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // 1) Get user based on reset code
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex');

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError('Reset code invalid or expired'));
  }

  // 2) Reset code valid
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({
    status: 'Success',
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  const user = await User.findOne({ email: req.body.email });
  
  if (!user) {
    return next(
      new ApiError(`There is no user with email ${req.body.email}`, 404)
    );
  }

  // 2) Check if reset code verified
  if (!user.passwordResetVerified) {
    return next(new ApiError('Reset code not verified', 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  // 3) if everything is ok, generate token
  const token = createToken(user._id);
  res.status(200).json({ token });
});
