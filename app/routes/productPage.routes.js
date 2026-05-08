const express = require("express");
const productRouter = express.Router();
const ProductPageController = require("./../controller/productPage.controller");
const AuthCheck = require("../middleware/authCheck]");
const authController = require("../controller/auth.controller");
productRouter.get(
  "/",
  AuthCheck,
  authController.CheckAuth,
  ProductPageController.productPage,
);
productRouter.get(
  "/logout",
  AuthCheck,
  authController.CheckAuth,
  authController.logOut,
);
productRouter.get("/filter", ProductPageController.filterProduct);
module.exports = productRouter;
