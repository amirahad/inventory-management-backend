const { model,Schema } = require('mongoose')

let userSchema = new Schema({
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
    },
    image: String,
    birthday: Date,
    joining_date: Date,
    gender: String,
    country: String,
    zip_code: String,
    key: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'manager', 'supplier'],
        default: 'user',
    },
    verified: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})

const User = model('User', userSchema)

module.exports = User

