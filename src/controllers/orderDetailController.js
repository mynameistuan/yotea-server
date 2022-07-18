import OrderDetail from "../models/orderDetailModel";
import Order from "../models/orderModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    const orderDetail = await new OrderDetail(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        orderDetail,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const features = await new APIFeatutes(OrderDetail, req.query).filter().sort().limitFields().paginate();
    const orderDetails = await features.query;

    res.json({
      status: true,
      payload: {
        orderDetails,
        total: features.total,
        totalPage: Math.ceil(features.total / features.limit),
        currentPage: features.page,
        perPage: features.limit,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const orderDetail = await OrderDetail.findOne({ _id }).exec();

    res.json({
      status: true,
      payload: {
        orderDetail,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const getByOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderDetail = await OrderDetail.find({ orderId }).exec();
    const order = await Order.findOne({ _id: orderId }).exec();

    res.json({
      status: true,
      payload: {
        orderDetail,
        order,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDetail = await OrderDetail.findOneAndUpdate({ _id: id }, req.body, { new: true });

    res.json({
      status: true,
      payload: {
        orderDetail,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const orderDetail = await OrderDetail.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
        orderDetail,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
