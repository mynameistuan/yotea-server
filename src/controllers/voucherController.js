import Voucher from "../models/voucherModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    const voucher = await new Voucher(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        voucher,
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
    const features = await new APIFeatutes(Voucher, req.query).filter().sort().limitFields().paginate();
    const vouchers = await features.query;

    res.json({
      status: true,
      payload: {
        vouchers,
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
    const voucher = await Voucher.findOne({ _id }).exec();

    res.json({
      status: true,
      payload: {
        voucher,
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
    const voucher = await Voucher.findOneAndUpdate({ _id: id }, req.body, { new: true });

    res.json({
      status: true,
      payload: {
        voucher,
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
    const voucher = await Voucher.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
        voucher,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
