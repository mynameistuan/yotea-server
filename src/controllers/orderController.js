import Order from "../models/orderModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    const order = await new Order(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        order: {
          _id: order._id,
          createdAt: order.createdAt,
        },
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
    const features = await new APIFeatutes(Order, req.query).filter().sort().limitFields().paginate();
    const orders = await features.query;

    res.json({
      status: true,
      payload: {
        orders,
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
    const order = await Order.findOne({ _id }).exec();

    res.json({
      status: true,
      payload: {
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
    const order = await Order.findOneAndUpdate({ _id: id }, req.body, { new: true });

    res.json({
      status: true,
      payload: {
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

export const remove = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const order = await Order.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
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
