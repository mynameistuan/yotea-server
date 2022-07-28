import User from "../models/userModel";
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

export const checkValid = async (req, res) => {
  try {
    const { code } = req.params;
    const voucherExits = await Voucher.findOne({ code: code.trim() }).exec();

    // check voucher tồn tại
    if (!voucherExits) {
      res.json({
        status: false,
        message: "Voucher không tồn tại",
      });
      return;
    }

    const {
      _doc: { status, quantity, timeStart, timeEnd, userIds },
    } = voucherExits;

    // check trạng thái
    if (!status) {
      res.json({
        status: false,
        message: "Voucher đã bị khóa",
      });
      return;
    }

    // check số lượng
    if (!quantity) {
      res.json({
        status: false,
        message: "Voucher đã hết số lượt sử dụng",
      });
      return;
    }

    // check thời gian
    const currentTime = new Date().getTime();
    const startTime = new Date(timeStart).getTime();
    const endTime = new Date(timeEnd).getTime();

    if (currentTime < startTime) {
      res.json({
        status: false,
        message: "Chưa đến thời gian sử dụng",
      });
      return;
    } else if (currentTime > endTime) {
      res.json({
        status: false,
        message: "Voucher đã quá thời gian sử dụng",
      });
      return;
    }

    // check lượt sd (chỉ được sd 1 lần
    const userInfo = await User.findOne({ email: req.user.email }).exec();
    const statusUsed = userIds.some((id) => id == userInfo._id);
    if (statusUsed) {
      res.json({
        status: false,
        message: "Bạn đã sử dụng Voucher này trước đó",
      });
      return;
    }

    res.json({
      status: true,
      payload: {
        voucher: voucherExits,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};
