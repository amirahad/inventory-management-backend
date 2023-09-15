const brandRoutes = require("./api/brand.routes");
const categoryRoutes = require("./api/category.routes");
const productRoutes = require("./api/product.routes");
const stockRoutes = require("./api/stock.routes");
const storeRoutes = require("./api/store.routes");
const supplierRoutes = require("./api/supplier.routes");
const userRoutes = require("./api/user.routes");


const apiRouters = require("express").Router();


apiRouters.use("/products", productRoutes);
apiRouters.use("/brand", brandRoutes);
apiRouters.use("/category", categoryRoutes);
apiRouters.use("/store", storeRoutes)
apiRouters.use("/supplier", supplierRoutes)
apiRouters.use("/stock", stockRoutes)
apiRouters.use("/user", userRoutes)


module.exports = apiRouters;