const brandRoutes = require("./api/brand.routes");
const productRoutes = require("./api/product.routes");
const apiRouters = require("express").Router();

apiRouters.use("/products", productRoutes);
apiRouters.use("/brand", brandRoutes);

module.exports = apiRouters;