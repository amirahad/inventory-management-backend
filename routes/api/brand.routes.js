const { postBrand, getBrands, getBrand, updateBrand } = require("../../controllers/brand.controller");

const brandRoutes = require("express").Router();

brandRoutes.get("/",getBrands);
brandRoutes.get("/:id",getBrand);
brandRoutes.post("/",postBrand);
brandRoutes.patch("/:id",updateBrand);


module.exports = brandRoutes;