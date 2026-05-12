const ProductModel = require("../model/product.db");
const httpStatusCode = require("../util/httpStatusCode");
class ProductPageController {
  async productPage(req, res) {
    // const products = await ProductDetails.find();
    try {
      const products = await ProductModel.find({ isDelete: false });
      res.render("product", {
        title: "Dashboard",
        data: products,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async filterProduct(req, res) {
    try {
      const { category, stock, sort, search } = req.query;
      const filter = { isDelete: false };
      const sortObj = {};
      if (search) {
        filter.name = { $regex: search, $options: "i" };
      }
      if (category) {
        filter.category = { $regex: `^${category}$`, $options: "i" };
      }
      if (stock === "low") {
        filter.stock = { $lt: 50 };
      }
      if (sort === "price_asc") {
        sortObj.price = 1;
      }
      if (sort === "price_desc") {
        sortObj.price = -1;
      }
      if (sort === "name_asc") {
        sortObj.name = 1;
      }
      if (sort === "name_desc") {
        sortObj.name = -1;
      }
      const filterProduct = await ProductModel.find(filter).sort(sortObj);
      return res.render("product", {
        title: "Product",
        data: filterProduct,
        search: search || ""
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new ProductPageController();
