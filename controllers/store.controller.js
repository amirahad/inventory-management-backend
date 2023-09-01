const Store = require("../models/store.model");


const getStores = async (req, res) => {
    try {
        const stores = await Store.find()
        res.status(200).json({
            status: 'success',
            data: stores
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}

const getStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id)
        if (!store) {
            return res.status(404).json({
                status: 'fail',
                message: 'store not found'
            })
        }
        res.status(200).json({
            status: 'success',
            data: store
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}

const postStore = async (req, res) => {
    try {
        const store = new Store(req.body)
        const createdStore = await store.save();
        res.status(201).json({
            status: "success",
            message: "Store Added Successfully",
            createdStore,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (store) {
            const updatedStore = await Store.updateOne({
                _id: req.params.id
            }, {
                $set: req.body
            }, {
                runValidators: true
            });
            res.status(200).json({
                message: "store Updated Successfully",
                status: "success"
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: "store not found"
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
    getStores,
    getStore,
    postStore,
    updateStore
}