const Brand = require("../models/brand.model");


const getBrands = async (req, res) => {
    try {
        const status = req.query.status ? { status: req.query.status } : {};
        const brands = await Brand
            .find({
                ...status
            })
            .populate('products')
        res.status(200).json({
            status: 'success',
            data: brands
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id)
        if (!brand) {
            return res.status(404).json({
                status: 'fail',
                message: 'Brand not found'
            })
        }
        res.status(200).json({
            status: 'success',
            data: brand
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}

const postBrand = async (req, res) => {
    try {
        const brand = new Brand(req.body)
        const createdBrand = await brand.save();
        res.status(201).json({
            status: "success",
            message: "Brand Added Successfully",
            createdBrand,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (brand) {
            const updatedBrand = await Brand.updateOne({
                _id: req.params.id
            }, {
                $set: req.body
            }, {
                runValidators: true
            });
            res.status(200).json({
                message: "Brand Updated Successfully",
                status: "success"
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: "Brand not found"
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
    getBrands,
    getBrand,
    postBrand,
    updateBrand
}