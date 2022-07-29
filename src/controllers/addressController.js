import Address from "../models/addressModel";
import User from "../models/userModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    const { name, phone, email, provinceCode, districtCode, wardCode, message, address } = req.body;

    // check address exits
    const userInfo = await User.findOne({ email: req.user.email }).exec();
    const filter = {
      userId: userInfo._id,
      name,
      phone,
      email,
      provinceCode: +provinceCode,
      districtCode: +districtCode,
      wardCode: +wardCode,
      message,
      address,
    };

    const addressExits = await Address.findOne(filter).exec();
    if (addressExits) {
      res.json({
        status: false,
        message: "Địa chỉ đã tồn tại",
      });
      return;
    }

    await new Address(req.body).save();

    res.status(201).json({
      status: true,
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
    const features = await new APIFeatutes(Address, req.query).filter().sort().limitFields().paginate();
    const addresss = await features.query;

    res.json({
      status: true,
      payload: {
        addresss,
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
    const address = await Address.findOne({ _id }).exec();

    res.json({
      status: true,
      payload: {
        address,
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
    const address = await Address.findOneAndUpdate({ _id: id }, req.body, { new: true });

    res.json({
      status: true,
      payload: {
        address,
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
    const address = await Address.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
        address,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const getAddressMe = async (req, res) => {
  try {
    const userInfo = await User.findOne({ email: req.user.email }).exec();
    const features = await new APIFeatutes(Address.find({ userId: userInfo._id }), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const addresses = await features.query;

    res.json({
      status: true,
      payload: {
        addresses,
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
