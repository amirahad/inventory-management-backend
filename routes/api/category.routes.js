const { postCategory, getCategories, getCategory, updateCategory } = require("../../controllers/category.controller");

const categoryRoutes = require("express").Router();

categoryRoutes.get("/", getCategories);
categoryRoutes.get("/:id", getCategory);
categoryRoutes.post("/", postCategory);
categoryRoutes.patch("/:id", updateCategory);


module.exports = categoryRoutes;