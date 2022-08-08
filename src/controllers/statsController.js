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
        $limit: +req.query.limit || +process.env.LIMIT,
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

// thống kê số đơn hàng theo trạng thái
export const orderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          total: {
            $sum: 1,
          },
        },
      },
      {
        $addFields: {
          status: "$_id",
          statusText: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 0] }, then: "Đơn hàng mới" },
                { case: { $eq: ["$_id", 1] }, then: "Đã xác nhận" },
                { case: { $eq: ["$_id", 2] }, then: "Đang giao hàng" },
                { case: { $eq: ["$_id", 3] }, then: "Đã giao hàng" },
              ],
              default: "Đã hủy",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { status: 1 },
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
