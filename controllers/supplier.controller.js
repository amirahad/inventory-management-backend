const Supplier = require('../models/supplier.model');
const Brand = require('../models/brand.model');


const getSuppliers = (async (req, res) => {
    try {
        const status = req.query.status ? { status: req.query.status } : {};
        const suppliers = await Supplier.find({
            ...status
        });
        res.status(200).json({
            suppliers
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message
        })
    }
})

const getSupplier = (async (req, res) => {
    try {
        const supplier = await Supplier.find({
            _id: req.params.id
        }).populate('brand.id');
        res.status(200).json({
            status: "success",
            data: supplier
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message
        })
    }
})

const createSupplier = (async (req, res, next) => {
    try {
        const supplier = new Supplier(req.body)
        const createdSupplier = await supplier.save()
        res.status(201).json({
            status: "success",
            data: createdSupplier
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message
        })
    }
})

const updateSupplier = async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const update = { $set: req.body };

        const result = await Supplier.updateOne(filter, update, { runValidators: true });

        if (result.nModified > 0) {
            res.status(200).json({
                message: "Supplier Updated Successfully",
                status: "success",
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: "Supplier not found or no changes made"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message
        });
    }
};




const deleteSupplier = (async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        const deletedSupplier = await supplier.remove()
        res.status(200).json({
            status: "success",
            message: "Supplier deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Supplier deletion failed",
            error: error.message
        })
    }
})

module.exports = {
    getSuppliers,
    getSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier
}