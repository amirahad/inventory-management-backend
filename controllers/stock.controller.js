const Stock = require('../models/stock.model');

const getStocks = (async (req, res) => {
    try {
        let filters = { ...res.query }
        const excludeFields = ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach(el => delete filters[el])
        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        filters = JSON.parse(filtersString)
        const queries = {}

        if (req.query.page) {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const skip = (page - 1) * limit
            queries.skip = skip
            queries.limit = limit
        }
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sort = sortBy
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            queries.select = fields
        }

        const stocks = await Stock.find(filters, null, queries)


        res.status(200).json({
            stocks
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message
        })
    }
})

const getStock = (async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id)
        res.status(200).json({
            stock
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message
        })
    }
})

const createStock = (async (req, res, next) => {
    try {
        const stock = await Stock.create(req.body)
        res.status(201).json({
            stock
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message
        })
    }
})

const updateStock = (async (req, res, next) => {
    try {
        const filter = { _id: req.params.id };
        const update = { $set: req.body };

        const result = await Stock.updateOne(filter, update, { runValidators: true });

        if (result.nModified < 0) {
            res.status(200).json({
                status: "success",
                data: result
            });
        } else {
            res.status(404).json({
                status: "error",
                error: "Stock not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: error.message
        });
    }
})

module.exports = {
    getStocks,
    getStock,
    createStock,
    updateStock
}

