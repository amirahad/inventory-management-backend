const Product = require("../models/product.model");
const Brand = require("../models/brand.model");
const Category = require("../models/category.model");

const getProducts = (async (req, res) => {
    try {
        const status = req.query.status ? { status: req.query.status } : {};
        const products = await Product.find({
            ...status
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const getProduct = (async (req, res) => {
    try {
        const product = await Product.find({
            _id: req.params.id,
            name: req.params.name
        })
        res.status(200).json({
            status: "success",
            product
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


const postProduct = (async (req, res, next) => {
    try {
        const product = new Product(req.body)


        const { _id, brand, categories } = product

        await Brand.updateOne(
            { _id: brand.id },
            { $push: { products: _id } }
        );

        await Category.updateOne(
            { _id: categories.id },
            { $push: { products: _id } }
        );
        const createdProduct = await product.save()
        res.status(201).json(createdProduct);


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const updateProduct = (async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            // $set: {req.body}
            // const updatedProduct = await product.save();
            // res.status(200).json(updatedProduct);
            const updatedProduct = await Product.updateOne({ _id: req.params.id },
                { $set: req.body },
                runValidators = true
            );
            res.status(200).json({
                message: "Product Updated Successfully",
                status: "success"
            });
        } else {
            res.status(404).json({ message: "Product not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const bulkUpdateProduct = (async (req, res, next) => {
    try {
        const updatedProducts = await Product.updateMany(
            { _id: req.body.ids },
            { $set: req.body.data },
        );
        res.status(200).json({
            message: "Products Updated Successfully",
            status: "success"
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const deleteProduct = (async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            const result = await product.remove();

            res.status(200).json({
                message: "Product Deleted Successfully",
                status: "success"
            });
        } else {
            res.status(404).json({ message: "Product not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    updateProduct,
    bulkUpdateProduct,
    deleteProduct
}