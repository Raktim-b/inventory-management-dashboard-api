const express = require("express");
const trashRouter = express.Router();
const TrashController = require("./../controller/trash.controller");
const AuthCheck = require("../middleware/authCheck");
const roleCheck = require("../middleware/roleCheck");
trashRouter.get("/trash", AuthCheck, roleCheck("admin"), TrashController.Trash);
trashRouter.get(
  "/restore/:id",
  AuthCheck,
  roleCheck("admin"),
  TrashController.Restore,
);
trashRouter.get(
  "/hardDelete/:id",
  AuthCheck,
  roleCheck("admin"),
  TrashController.HardDelete,
);
module.exports = trashRouter;
