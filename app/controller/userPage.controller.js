const ProductModel = require("../model/product.db");

class UserController {
  async userPage(req, res) {
    try {
      const products = await ProductModel.find({ isDelete: false });
      res.render("userPage", {
        title: "Product Page",
        data: products,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new UserController();
