const productRoutes = require("./api/product.routes");
const apiRouters = require("express").Router();

apiRouters.use("/products", productRoutes);

module.exports = apiRouters;