const express = require("express");
const addProductRouter = express.Router();
const addProductController = require("./../controller/addProductPage.controller");
const ProductImage = require("../middleware/fileUploades");
const roleCheck = require("../middleware/roleCheck");
const AuthCheck = require("../middleware/authCheck");
addProductRouter.get("/add", addProductController.addProduct);
addProductRouter.post(
  "/post",
  ProductImage.single("image"),
  AuthCheck,
  roleCheck("admin"),
  addProductController.createProduct,
);

module.exports = addProductRouter;
