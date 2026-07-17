const express = require("express");
const softDeleteRouter = express.Router();
const softDeleteController = require("./../controller/softDelete.controller");
const AuthCheck = require("../middleware/authCheck");
const roleCheck = require("../middleware/roleCheck");

softDeleteRouter.get(
  "/delete/:id",
  AuthCheck,
  roleCheck("admin"),
  softDeleteController.SoftDelete,
);
module.exports = softDeleteRouter;
