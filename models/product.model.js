const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;
const validator = require("validator");

const productSchema = new Schema({
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
    ratings: {
        type: Number,
        default: 0
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
    categories: {
        name: {
            type: String,
            required: [true, "Product category is required"],
        },
        id: {
            type: ObjectId,
            ref: 'Category',
        },
    },
    images: [{
        type: String,
        required: [true, "Product images are required"],
        validate: [validator.isURL, 'Invalid URL']
    }],

}, { timestamps: true })

const Product = model("Product", productSchema)

module.exports = Product;