const ProductModel = require("../model/product.db");
const httpStatusCode = require("../util/httpStatusCode");
class ProductPageController {
  constructor() {
    this.productPage = this.productPage.bind(this);
    this.filterProduct = this.filterProduct.bind(this);
  }

  async productPage(req, res) {
    // const products = await ProductDetails.find();
    try {
      const products = await ProductModel.find({ isDelete: false });
      const stats = await this.getStats();
      res.render("product", {
        title: "Dashboard",
        data: products,
        totalProducts: stats?.totalProducts || 0,
        totalStock: stats?.totalStock || 0,
        totalValue: stats?.totalValue || 0,
        avgPrice: Math.round(stats?.avgPrice || 0),
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async getStats() {
    const stats = await ProductModel.aggregate([
      {
        $match: {
          isDelete: false,
        },
      },
      {
        $group: {
          _id: null,

          totalProducts: {
            $sum: 1,
          },

          totalStock: {
            $sum: "$stock",
          },

          totalValue: {
            $sum: "$price",
          },

          avgPrice: {
            $avg: "$price",
          },
        },
      },
    ]);

    return stats[0];
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

      // LOW STOCK FILTER
      if (stock === "low") {
        pipeline.push({
          $match: {
            stock: {
              $lt: 50,
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
      const stats = await this.getStats();
      return res.render("product", {
        title: "Product",
        data: filterProduct,
        search: search || "",
        totalProducts: stats?.totalProducts || 0,
        totalStock: stats?.totalStock || 0,
        totalValue: stats?.totalValue || 0,
        avgPrice: Math.round(stats?.avgPrice || 0),
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
