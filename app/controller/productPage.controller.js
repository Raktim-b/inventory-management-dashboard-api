const ProductModel = require("../model/product.db");
const httpStatusCode = require("../util/httpStatusCode");

class ProductPageController {
  constructor() {
    this.productPage = this.productPage.bind(this);
  }

  async productPage(req, res) {
    try {
      const { category, stock, sort, search } = req.query;

      const page = Number(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;

      const pipeline = [
        {
          $match: {
            isDelete: false,
          },
        },
      ];

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

      if (stock === "low") {
        pipeline.push({
          $match: {
            stock: {
              $lt: 50,
            },
          },
        });
      }

      if (sort === "price_asc") {
        pipeline.push({
          $sort: {
            price: 1,
          },
        });
      }

      if (sort === "price_desc") {
        pipeline.push({
          $sort: {
            price: -1,
          },
        });
      }

      if (sort === "name_asc") {
        pipeline.push({
          $sort: {
            name: 1,
          },
        });
      }

      if (sort === "name_desc") {
        pipeline.push({
          $sort: {
            name: -1,
          },
        });
      }

      const totalData = await ProductModel.aggregate([
        ...pipeline,
        {
          $count: "total",
        },
      ]);

      const totalProductsCounts = totalData[0]?.total || 0;

      const totalPages = Math.ceil(totalProductsCounts / limit);

      // PAGINATION
      pipeline.push(
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      );

      // PRODUCTS
      const products = await ProductModel.aggregate(pipeline);

      // STATS
      const stats = await this.getStats();

      return res.render("product", {
        title: "Dashboard",

        data: products,

        totalProducts: stats?.totalProducts || 0,
        totalStock: stats?.totalStock || 0,
        totalValue: stats?.totalValue || 0,
        avgPrice: Math.round(stats?.avgPrice || 0),

        currentPage: page,
        totalPages,

        search: search || "",
        category: category || "",
        stock: stock || "",
        sort: sort || "",
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
}

module.exports = new ProductPageController();
