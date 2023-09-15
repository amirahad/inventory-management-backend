const { userRegistration, signupOTPVerify, signupResendOTP, userLogin, userUpdatebyToken, getUserList } = require('../../controllers/user.controller');

const userRoutes = require('express').Router();

const { userAuth } = require('../../auth/index');


userRoutes.post('/signup', userRegistration);
userRoutes.post('/signup-otp-verify', signupOTPVerify);
userRoutes.post('/signup-resend-otp', signupResendOTP);

userRoutes.post('/login', userLogin)

userRoutes.post('/update', userAuth({ isAuth: true }), userUpdatebyToken)

userRoutes.get('/list', userAuth({ isAdmin: true }), getUserList)

module.exports = userRoutes;