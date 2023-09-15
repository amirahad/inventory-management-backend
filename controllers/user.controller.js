
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const OTP = require('../models/otp.model');
const { generateOTP } = require('../utils/common');


const secret = process.env.JWT_SECRET



const userRegistration = async (req, res, next) => {
    try {
        let { body } = req;
        const exitUser = await User.findOne({ $or: [{ email: body.email }, { phone: body.phone }] });
        if (!!exitUser) {
            return res.status(400).send({
                error: true,
                msg: 'An account with this credentials has already existed',
            });
        }

        let hashedPassword = '';
        if (!!body.password) {
            hashedPassword = await bcrypt.hash(body.password, 8);
        } else {
            return res.status(400).send({
                error: true,
                msg: 'Password required',
            })
        }
        let user = new User({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            phone: body.phone,
            password: hashedPassword,
            image: body.image,
            role: body.role || 'user',
        })
        await user.save();

        // opt send
        //***************************************************
        let otp = await OTP.findOne({ phone: body.phone, action: 'signup' });
        if (!!otp) {
            return res.status(401).send({
                error: true,
                msg: 'Already send. Please try after 2 min'
            });
        }
        let code = generateOTP();
        const otp_msg = `Your verification OTP code is: ${code}`
        if (!!body.phone) {
            const smsData = {
                body: otp_msg,
                to: [user.phone]
            }
            console.log({ smsData })
            // if (process.env.NODE_ENV === "production") {
            //     await sendSMSMessageBird(smsData);
            // }
        }
        await OTP.create({
            phone: body.phone,
            email: body.email,
            code,
            action: 'signup'
        })
        //********************************************************

        return res.status(200).send({
            error: false,
            msg: 'OTP sent Successful',
            code: process.env.NODE_ENV === 'development' && code,
            phone: body.phone,
        })
    } catch (e) {
        if (e?.code === 11000) {
            return res.status(406).send({
                error: true,
                msg: 'An account with this credential has already existed',
            })
        }
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

const signupOTPVerify = async (req, res) => {
    try {
        const { body } = req
        let otp = await OTP.findOne({ phone: body.phone, action: 'signup' })
        if (!!otp && otp?.attempts > 0 && body.otp === otp?.code) {
            let user = null;
            if (!!body.token) {
                const secret = process.env.JWT_SECRET
                const userInfo = jwt.verify(body.token, secret)

                user = await User.findOne({ _id: mongoose.Types.ObjectId(userInfo?._id) }, 'first_name middle_name last_name phone email')
            } else {
                user = await User.findOne({ phone: body.phone }, 'first_name middle_name last_name phone email')
            }
            if (!user) {
                return res.status(404).send({
                    error: true,
                    msg: 'User Not Found'
                })
            }
            await User.updateOne({ _id: user._id }, { $set: { verified: true, active: true } })
            return res.status(200).send({
                error: false,
                msg: 'Successfully verified',
            })
        }
        if (otp) {
            otp.attempts -= 1
            await otp.save()
        }
        return res.status(401).send({
            error: true,
            msg: 'Invalid/Expired otp'
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

const signupResendOTP = async (req, res) => {
    try {
        const { body } = req;
        let otp = await OTP.findOne({ phone: body.phone, action: 'signup' });
        if (!!otp) {
            return res.status(401).send({
                error: true,
                msg: 'Already send. Please try after 2 min'
            });
        }

        let isUser = null;
        if (!!body.token) {
            // gmail phone number verification
            const secret = process.env.JWT_SECRET
            const userInfo = jwt.verify(body.token, secret)

            isUser = await User.findOne({ _id: mongoose.Types.ObjectId(userInfo?._id) })
        } else {
            isUser = await User.findOne({ phone: body.phone })
        }

        if (!isUser) {
            return res.status(401).send({
                error: true,
                msg: 'User not found'
            });
        }
        let code = generateOTP();
        const otp_msg = `Your verification OTP code is: ${code}`
        if (!!body.phone) {
            const smsData = {
                body: otp_msg,
                to: [body.phone]
            }
            console.log(smsData)
            // if (process.env.NODE_ENV === "production") {
            //     await sendSMSMessageBird(smsData);
            // }
        }
        await OTP.create({
            phone: body.phone,
            code,
            action: 'signup'
        })
        return res.status(200).send({
            error: false,
            msg: 'Successfully registered',
            code: process.env.NODE_ENV === 'development' && code,
            phone: body.phone,
            token: body.token
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

const userLogin = async (req, res) => {
    try {
        let { body } = req;
        if (body.email && body.password) {
            const email = body.email.trim().toLowerCase()
            const user = await User.findOne({ email: email }, 'password phone verified role active');
            if (user) {
                let auth = await bcrypt.compare(body.password, user.password);
                if (auth) {
                    // console.log(user, user?.role, secret)
                    let token = await jwt.sign({ _id: user._id, role: user.role }, secret, { expiresIn: '15d' })
                    return res.status(200).send({
                        error: false,
                        msg: 'Login successful',
                        token,
                        role: user?.role,
                        phone: user?.phone,
                        verified: user?.verified,
                        active: user?.active,
                    })
                } else {
                    return res.status(401).send({
                        error: true,
                        msg: 'Invalid Credentials'
                    })
                }
            }
            return res.status(404).send({
                error: true,
                msg: 'User does not exist'
            })
        }
        return res.status(404).json({
            error: true,
            msg: 'Invalid Credentials'
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

const userUpdatebyToken = async (req, res) => {
    try {
        const { body } = req;
        const { user } = res.locals
        console.log({ user })
        await User.findByIdAndUpdate(user._id, { $set: body });
        return res.status(200).send({
            error: false,
            msg: 'Successfully updated',
        })
    } catch (error) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }

}

const getUserList = async (req, res) => {
    try {
        const { user } = res.locals
        let users = await User.find(
            { _id: { $ne: user._id } },
            { password: 0, __v: 0, createdAt: 0, updatedAt: 0 }
        )
        return res.status(200).send({
            error: false,
            msg: 'Successfully fetched',
            users
        })
    } catch (error) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }

}


module.exports = {
    userRegistration,
    signupOTPVerify,
    signupResendOTP,
    userLogin,
    userUpdatebyToken,
    getUserList
}