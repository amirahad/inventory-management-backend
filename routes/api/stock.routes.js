const stockRoutes = require("express").Router();

const { getStocks, getStock, createStock, updateStock, deleteStock } = require('../../controllers/stock.controller');

stockRoutes.get('/', getStocks);
stockRoutes.get('/:id', getStock);
stockRoutes.post('/', createStock);
stockRoutes.patch('/:id', updateStock);
// stockRoutes.delete('/:id', deleteStock);


module.exports = stockRoutes;

