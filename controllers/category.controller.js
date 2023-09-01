const Category = require("../models/category.model");


const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json({
            status: 'success',
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({
                status: 'fail',
                message: 'category not found'
            })
        }
        res.status(200).json({
            status: 'success',
            data: category
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}

const postCategory = async (req, res) => {
    try {
        const category = new Category(req.body)
        const createdCategory = await category.save();
        res.status(201).json({
            status: "success",
            message: "Category Added Successfully",
            createdCategory,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            const updatedCategory = await Category.updateOne({
                _id: req.params.id
            }, {
                $set: req.body
            }, {
                runValidators: true
            });
            res.status(200).json({
                message: "Category Updated Successfully",
                status: "success"
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: "Category not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}



module.exports = {
    getCategories,
    getCategory,
    postCategory,
    updateCategory
}