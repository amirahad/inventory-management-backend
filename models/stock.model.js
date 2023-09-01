const { Schema, model } = require('mongoose');
const validator = require('validator');
const { ObjectId } = Schema.Types

const stockSchema = new Schema({
    productId: {
        type: ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
    },
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    unit: {
        type: String,
        required: [true, "Product unit is required"],
        enum: {
            values: [
                "kg",
                "g",
                "litre",
                "ml",
                "pcs",
                "bag",
            ],
            message: "Please select correct unit for product"
        }
    },
    category: {
        name: {
            type: String,
            required: [true, "Product category is required"],
        },
        id: {
            type: ObjectId,
            ref: 'Category',
        },
    },
    brand: {
        name: {
            type: String,
            required: [true, "Product brand is required"],
        },
        id: {
            type: ObjectId,
            ref: 'Brand',
        },
    },
    // images: [{
    //     required: [true, "Product images are required"],
    //     type: String,
    //     validate: {
    //         validator: (v) => {
    //             //check if not an array
    //             if (!Array.isArray(v)) {
    //                 return false;
    //             }
    //             //check if array elements are valid url
    //             let isValid = true;
    //             v.forEach((url) => {
    //                 if (!validator.isURL(url)) {
    //                     isValid = false;
    //                 }
    //             });
    //             return isValid;
    //         },
    //         message: "Product should have at least one image"
    //     }
    // }],
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [1, "Price cannot be less than 1"],
    },
    quantity: {
        type: Number,
        required: [true, "Product stock is required"],
        min: [0, "Quantity cannot be less than 0"],
    },
    status: {
        type: String,
        enum: {
            values: ['in-stock', 'out-of-stock', 'upcoming', 'discontinued'],
            message: 'Please select correct status'
        },
        default: 'in-stock'
    },
    store: {
        name: {
            type: String,
            required: [true, 'Store name is required'],
            trim: true,
            lowercase: true,
            enum: {
                values: ['dhaka', 'chattogram', 'khulna', 'rajshahi', 'sylhet', 'barishal', 'rangpur', 'other'],
                message: 'Please select correct store'
            }
        },
        id: {
            type: ObjectId,
            ref: 'Store',
            required: [true, 'Store id is required']
        }
    },
    supplier:{
        name: {
            type: String,
            required: [true, 'Supplier name is required'],
            trim: true,
            lowercase: true,
        },
        id: {
            type: ObjectId,
            ref: 'Supplier',
            required: [true, 'Supplier id is required']
        }
    }
}, { timestamps: true });