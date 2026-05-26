const express = require("express");
const AuthCheck = require("../middleware/authCheck");
const roleCheck = require("../middleware/roleCheck");
const userPageController = require("../controller/userPage.controller");
const userRouter = express.Router();

userRouter.get("/", AuthCheck, roleCheck("user"), userPageController.userPage);
userRouter.get("/userFilter", userPageController.filterProduct);

module.exports = userRouter;
