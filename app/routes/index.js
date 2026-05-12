const express = require("express");
const router = express.Router();

const apiRoute = require("./product.routes");
const productRoutes = require("./productPage.routes");
const addProductRoutes = require("./addProductPage.routes");
const editProductRoutes = require("./editProductPage.routes");
const softDeleteRoutes = require("./softDelete.routes");
const trashRoutes = require("./trashPage.routes");
const authRoutes = require("./auth.routes");
const userRouter = require("./userPage.routes");

router.use("/api", apiRoute);
router.use("/products", productRoutes);
router.use("/products", addProductRoutes);
router.use("/products", editProductRoutes);
router.use("/products", softDeleteRoutes);
router.use("/products", trashRoutes);

router.use("/auth", authRoutes);

router.use("/userPage", userRouter);

module.exports = router;
