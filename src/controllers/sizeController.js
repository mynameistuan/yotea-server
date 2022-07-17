import Size from "../models/sizeModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    const size = await new Size(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        size,
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
    const features = await new APIFeatutes(Size, req.query).filter().sort().limitFields().paginate();
    const sizes = await features.query;

    res.json({
      status: true,
      payload: {
        sizes,
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
    const size = await Size.findOne({ _id }).exec();

    res.json({
      status: true,
      payload: {
        size,
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
    const size = await Size.findOneAndUpdate({ _id: id }, req.body, { new: true });

    res.json({
      status: true,
      payload: {
        size,
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
    const size = await Size.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
        size,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
