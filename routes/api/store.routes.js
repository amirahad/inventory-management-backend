const { getStores, getStore, postStore, updateStore } = require("../../controllers/store.controller");

const storeRoutes = require("express").Router();

storeRoutes.get("/", getStores);
storeRoutes.post("/", postStore);
storeRoutes.get("/:id", getStore);
storeRoutes.patch("/:id", updateStore);

module.exports = storeRoutes;