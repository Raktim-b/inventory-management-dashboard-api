const express = require("express");
const authRouter = express.Router();
const authController = require("./../controller/auth.controller");
const ProductImage = require("../middleware/fileUploades");

authRouter.get("/registration", authController.registrationPage);
authRouter.post(
  "/registration/create",
  ProductImage.single("image"),
  authController.registration,
);

authRouter.get("/login", authController.loginPage);
authRouter.post("/login/create", authController.logIn);

authRouter.get("/verifyPage", authController.verifyPage);
authRouter.post("/verify", authController.verify);

module.exports = authRouter;
