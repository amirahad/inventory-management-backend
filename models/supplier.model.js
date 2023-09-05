const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;
const validator = require('validator');

const supplierSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Supplier name is required'],
        trim: true,
        maxlength: 100,
        lowercase: true
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Invalid Email'],
        lowercase: true,
    },
    phone: {
        type: String,
        validate: [validator.isMobilePhone, 'Invalid Phone Number'],
        required: [true, 'Phone Number is required'],
    },
    emergencyPhone: {
        type: String,
        validate: [validator.isMobilePhone, 'Invalid Phone Number'],
        required: [true, 'Phone Number is required'],
    },
    address: String,
    brand: {
        name: {
            type: String,
            trim: true,
            lowercase: true
        },
        id: {
            type: ObjectId,
            required: [true, 'Brand ID is required'],
            ref: 'Brand'
        }
    },
    tradeLicenseNumber: {
        type: String,
        required: [true, 'Trade License Number is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    status: {
        type: String,
        enum: ['active', 'in-active'],
        default: 'active'
    },
    imageUrl: {
        type: String,
        validate: [validator.isURL, 'Invalid URL'],
    },

}, {
    timestamps: true
})

const Supplier = model('Supplier', supplierSchema);

module.exports = Supplier;