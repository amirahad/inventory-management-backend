const { getSuppliers, getSupplier, createSupplier, updateSupplier, deleteSupplier } = require('../../controllers/supplier.controller');

const supplierRoutes = require('express').Router();

supplierRoutes.get('/', getSuppliers);
supplierRoutes.get('/:id', getSupplier);
supplierRoutes.post('/', createSupplier);
supplierRoutes.patch('/:id', updateSupplier);
supplierRoutes.delete('/:id', deleteSupplier);

module.exports = supplierRoutes;