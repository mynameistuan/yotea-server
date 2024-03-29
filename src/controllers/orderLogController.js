import OrderLog from "../models/orderLogModel";
import Order from "../models/orderModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    const orderLog = await new OrderLog(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        orderLog,
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
    const features = await new APIFeatutes(OrderLog, req.query).filter().sort().limitFields().paginate();
    const orderLogs = await features.query;

    res.json({
      status: true,
      payload: {
        orderLogs,
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
    const orderLog = await OrderLog.findOne({ _id }).exec();

    res.json({
      status: true,
      payload: {
        orderLog,
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
    const orderLog = await OrderLog.findOneAndUpdate({ _id: id }, req.body, { new: true });

    res.json({
      status: true,
      payload: {
        orderLog,
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
    const orderLog = await OrderLog.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
        orderLog,
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
    const { id } = req.params;
    const orderLogsQuery = await OrderLog.find({ orderId: id }).sort("status");
    const orderQuery = await Order.findOne({ _id: id }).exec();

    const [orderLogs, order] = await Promise.all([orderLogsQuery, orderQuery]);

    res.json({
      status: true,
      payload: {
        orderLogs,
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
