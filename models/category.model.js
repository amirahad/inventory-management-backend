const { Schema, model } = require('mongoose');
const validator = require('validator');
const { ObjectId } = Schema.Types

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true,
        maxlength: 100,
        lowercase: true
    },
    description: String,
    image: {
        type: String,
        validate: [validator.isURL, 'Invalid URL'],
    },


}, { timestamps: true });

const Category = model('Category', categorySchema);

module.exports = Category;