import Topping from "../models/toppingModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    const topping = await new Topping(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        topping,
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
    const features = await new APIFeatutes(Topping, req.query).filter().sort().limitFields().paginate();
    const toppings = await features.query;

    res.json({
      status: true,
      payload: {
        toppings,
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
    const topping = await Topping.findOne({ _id }).exec();

    res.json({
      status: true,
      payload: {
        topping,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const getDefault = async (req, res) => {
  try {
    const topping = await Topping.findOne({ price: 0 }).exec();

    res.json({
      status: true,
      payload: {
        topping,
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
    const topping = await Topping.findOneAndUpdate({ _id: id }, req.body, { new: true });

    res.json({
      status: true,
      payload: {
        topping,
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
    const topping = await Topping.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
        topping,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
