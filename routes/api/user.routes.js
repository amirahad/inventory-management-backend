const { userRegistration, signupOTPVerify, signupResendOTP } = require('../../controllers/user.controller');

const userRoutes = require('express').Router();


userRoutes.post('/signup', userRegistration);
userRoutes.post('/signup-otp-verify', signupOTPVerify);
userRoutes.post('/signup-resend-otp', signupResendOTP);

module.exports = userRoutes;