import Product from "../models/productModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const getAll = async (req, res) => {
  try {
    const features = await new APIFeatutes(Product, req.query).filter().sort().limitFields().paginate();
    // execute query
    const products = await features.query;

    res.json({
      status: true,
      payload: {
        products,
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
    const product = await Product.findOne({ _id: id }).exec();

    res.json({
      status: true,
      payload: {
        product,
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
    const product = await new Product(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        product,
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
    const { id: _id } = req.params;
    const product = await Product.findOneAndUpdate({ _id }, req.body, { new: true }).exec();

    res.json({
      status: true,
      payload: {
        product,
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
    const product = await Product.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
