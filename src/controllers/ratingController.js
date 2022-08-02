import Rating from "../models/ratingModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    // check rating
    const { userId, productId, ratingNumber } = req.body;
    const ratingExits = await Rating.findOne({ userId, productId }).exec();

    // nếu đã rating
    if (ratingExits) {
      const rating = await Rating.findOneAndUpdate(
        { _id: ratingExits._id },
        { userId, productId, ratingNumber },
        { new: true },
      ).exec();
      res.json({
        status: true,
        payload: {
          rating,
        },
      });
      return;
    }

    const rating = await new Rating(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        rating,
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
    const ratings = await Rating.find().exec();

    res.json({
      status: true,
      payload: {
        ratings,
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
    const rating = await Rating.findOne({ _id: id }).exec();

    res.json({
      status: true,
      payload: {
        rating,
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
    const rating = await Rating.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec();

    res.json({
      status: true,
      payload: {
        rating,
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
    const rating = await Rating.findOneAndRemove({ _id: id }).exec();

    res.json({
      status: true,
      payload: {
        rating,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const getByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const features = await new APIFeatutes(Rating.find({ productId }), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const ratings = await features.query;

    res.json({
      status: true,
      payload: {
        ratings,
        total: features.total,
        totalPage: Math.ceil(features.total / features.limit),
        currentPage: features.page,
        perPage: features.limit,
      },
    });
  } catch (error) {}
};
