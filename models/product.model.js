const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

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
    // subcategories: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'category',
    // }],
    // child_category: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'category',
    // }],
    images: [{
        required: [true, "Product images are required"],
        type: String,
        validate: {
            validator: (v) => {
                //check if not an array
                if (!Array.isArray(v)) {
                    return false;
                }
                //check if array elements are valid url
                let isValid = true;
                v.forEach((url) => {
                    if (!validator.isURL(url)) {
                        isValid = false;
                    }
                });
                return isValid;
            },
            message: "Product should have at least one image"
        }
    }],
    // category: {
    //     type: String,
    //     required: [true, "Product category is required"],
    //     enum: {
    //         values: [
    //             "Electronics",
    //             "Cameras",
    //             "Laptops",
    //             "Accessories",
    //             "Headphones",
    //             "Food",
    //             "Books",
    //             "Clothes/Shoes",
    //             "Beauty/Health",
    //             "Sports",
    //             "Outdoor",
    //             "Home"
    //         ],
    //         message: "Please select correct category for product"
    //     }
    // },
    // seller: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Seller",
    //     required: [true, "Product seller is required"]
    // },

    // reviews: [
    //     {
    //         user: {
    //             type: Schema.Types.ObjectId,
    //             ref: "User",
    //             required: true
    //         },
    //         name: {
    //             type: String,
    //             required: true
    //         },
    //         rating: {
    //             type: Number,
    //             required: true
    //         },
    //         comment: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ],
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },

}, { timestamps: true })

const Product = model("Product", productSchema)

module.exports = Product;