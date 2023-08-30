const  { Schema, model } = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types

const brandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Brand name is required'],
        trim: true,
        unique: true,
        maxlength: 100,
        lowercase: true
    },
    description: String,
    image: {
        type: String,
        validate: [ validator.isURL, 'Invalid URL'],
    },
    email: {
        type: String,
        validate: [ validator.isEmail, 'Invalid Email'],
        lowercase: true
    },
    phone: String,
    address: String,
    website: {
        type: String,
        validate: [ validator.isURL, 'Invalid URL'],
    },
    products: [{
        type: ObjectId,
        ref: 'Product'
    }],
    suppliers: [{
        name: String,
        email: String,
        phone: String,
        id: {
            type: ObjectId,
            ref: 'Supplier'
        },
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }

}, { timestamps: true });

const Brand = model('Brand', brandSchema);

module.exports = Brand;