import CateProduct from "../models/cateProductModel";
import Order from "../models/orderModel";
import User from "../models/userModel";

// thống kê sp theo danh mục
export const productStats = async (req, res) => {
  try {
    const stats = await CateProduct.aggregate([
      {
        $lookup: {
          from: "products",
          foreignField: "categoryId",
          localField: "_id",
          as: "products",
          pipeline: [
            {
              $match: {
                status: { $eq: 1 },
              },
            },
          ],
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 4,
      },
    ]);

    res.json({
      status: true,
      payload: {
        stats,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

// thống kê user đăng ký theo tháng
export const userStats = async (req, res) => {
  try {
    const year = +req.query.year || +new Date().getFullYear();

    const stats = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          total: { $sum: 1 },
        },
      },
      {
        $addFields: {
          month: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    res.json({
      status: true,
      payload: {
        stats,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

// thống kê doanh thu theo tháng
export const moneyStats = async (req, res) => {
  try {
    const year = +req.query.year || +new Date().getFullYear();

    const stats = await Order.aggregate([
      {
        $match: {
          status: { $eq: 3 },
          updatedAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$updatedAt",
          },
          totalPrice: { $sum: "$totalPrice" },
        },
      },
      {
        $addFields: { month: "$_id" },
      },
      {
        $project: { _id: 0 },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    res.json({
      status: true,
      payload: {
        stats,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
