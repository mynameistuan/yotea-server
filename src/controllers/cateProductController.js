import CateProduct from "../models/cateProductModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const getAll = async (req, res) => {
  try {
    const features = await new APIFeatutes(CateProduct, req.query).filter().sort().limitFields().paginate();

    const categories = await features.query;

    res.json({
      status: true,
      payload: {
        categories,
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
    const { id } = req.params;

    const category = await CateProduct.findOne({ _id: id }).exec();

    res.json({
      status: true,
      payload: {
        category,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const add = async (req, res) => {
  try {
    const category = await new CateProduct(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        category,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CateProduct.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec();

    res.json({
      status: true,
      payload: {
        category,
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
    const { id } = req.params;
    const category = await CateProduct.findOneAndDelete({ _id: id }).exec();

    res.json({
      status: true,
      payload: {
        category,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
