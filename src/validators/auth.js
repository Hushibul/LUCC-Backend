const { check, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
const User = require("../models/user");

exports.validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('firstName is required'),
    check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),
    check('lastName'),
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
];

exports.validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}




// exports.isAuthenticatedUser = async (req, res, next) => {
//     const { token } = req.cookies;
  
//     if (!token) {
//         return res.status(401).json({
//             message: "Please Login to access this resource",
//           });
//     }
  
//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
//     req.user = await User.findById(decodedData.id);
  
//     next();
//   };