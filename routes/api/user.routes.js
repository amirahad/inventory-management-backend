const { userRegistration,
    signupOTPVerify,
    signupResendOTP,
    userLogin, userUpdatebyToken, getUserList, getUserListByRole, getUserAccountInfo, sendPasswordResetOtp, otpVerifyForResetPassword, changePasswordForOtpRequest, passwordResetByToken } = require('../../controllers/user.controller');

const userRoutes = require('express').Router();

const { userAuth } = require('../../auth/index');


userRoutes.post('/signup', userRegistration);
userRoutes.post('/signup-otp-verify', signupOTPVerify);
userRoutes.post('/signup-resend-otp', signupResendOTP);

userRoutes.post('/login', userLogin)

userRoutes.post('/update', userAuth({ isAuth: true }), userUpdatebyToken)

userRoutes.get('/list/:role', userAuth({ isEmployee: true }), getUserListByRole)
userRoutes.get('/list', userAuth({ isEmployee: true }), getUserList)
userRoutes.get('/details', userAuth({ isAuth: true }), getUserAccountInfo);

userRoutes.post('/send-reset-otp', sendPasswordResetOtp);
userRoutes.post('/verify-reset-otp', otpVerifyForResetPassword);
userRoutes.post('/password-reset-by-otp', changePasswordForOtpRequest);
userRoutes.post('/password-reset-by-token', userAuth({ isAuth: true }), passwordResetByToken);

module.exports = userRoutes;