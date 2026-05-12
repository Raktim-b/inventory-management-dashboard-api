const express = require("express");
const productRouter = express.Router();
const ProductPageController = require("./../controller/productPage.controller");
const AuthCheck = require("../middleware/authCheck");
const authController = require("../controller/auth.controller");
const roleCheck = require("../middleware/roleCheck");
productRouter.get(
  "/",
  AuthCheck,
  roleCheck("admin"),
  ProductPageController.productPage,
);
productRouter.get("/logout", AuthCheck, authController.logOut);
productRouter.get("/filter", ProductPageController.filterProduct);
module.exports = productRouter;
