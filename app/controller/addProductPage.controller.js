const httpStatusCode = require("../util/httpStatusCode");
const ProductDetails = require("../model/product.db");
class AddProductPageController {
  async addProduct(req, res) {
    res.render("addProduct", {
      title: "Add Product",
    });
  }
  async createProduct(req, res) {
    try {
      console.log(req.body);
      const { name, size, price, color, stock, desc, category } = req.body;
      const dupProduct = await ProductDetails.findOne({ name });
      if (dupProduct) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Duplicate Product",
        });
      }
      if (!name || !size || !price || !color || !stock || !category) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "All fields are required",
        });
      }
      const product = new ProductDetails({
        name,
        size,
        price,
        color,
        stock,
        desc,
        category,
      });
      if (req.file) {
        product.image = req.file.path;
        product.public_id = req.file.filename;
      }
      const result = await product.save();
      const io = req.app.get("io");
      io.emit("newProduct", result);

      return res.redirect("/products");
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new AddProductPageController();
