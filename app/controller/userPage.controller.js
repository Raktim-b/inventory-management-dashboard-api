const ProductModel = require("../model/product.db");
const httpStatusCode = require("../util/httpStatusCode");
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
   async filterProduct(req, res) {
    try {
      const { category, stock, sort, search } = req.query;

      const pipeline = [
        {
          $match: {
            isDelete: false,
          },
        },
      ];

      // SEARCH
      if (search) {
        pipeline.push({
          $match: {
            name: {
              $regex: search,
              $options: "i",
            },
          },
        });
      }

      // CATEGORY FILTER
      if (category) {
        pipeline.push({
          $match: {
            category: {
              $regex: `^${category}$`,
              $options: "i",
            },
          },
        });
      }


      // SORT PRICE LOW → HIGH
      if (sort === "price_asc") {
        pipeline.push({
          $sort: {
            price: 1,
          },
        });
      }

      // SORT PRICE HIGH → LOW
      if (sort === "price_desc") {
        pipeline.push({
          $sort: {
            price: -1,
          },
        });
      }

      // SORT NAME A → Z
      if (sort === "name_asc") {
        pipeline.push({
          $sort: {
            name: 1,
          },
        });
      }

      // SORT NAME Z → A
      if (sort === "name_desc") {
        pipeline.push({
          $sort: {
            name: -1,
          },
        });
      }

      const filterProduct = await ProductModel.aggregate(pipeline);
      return res.render("userPage", {
        title: "Product Page",
        data: filterProduct,
        search: search || "",
       
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new UserController();
