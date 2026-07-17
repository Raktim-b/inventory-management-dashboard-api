const express = require("express");
const editProductRouter = express.Router();
const editProductController = require("../controller/editProductPage.controller");
const ProductImage = require("../middleware/fileUploades");
const AuthCheck = require("../middleware/authCheck");
const roleCheck = require("../middleware/roleCheck");
editProductRouter.get("/edit/:id", editProductController.editProductPage);
editProductRouter.post(
  "/update/:id",
  AuthCheck,
  roleCheck("admin"),
  ProductImage.single("image"),
  editProductController.updateProduct,
);
module.exports = editProductRouter;
