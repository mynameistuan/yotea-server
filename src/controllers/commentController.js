import Comment from "../models/commentModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    const comment = await new Comment(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        comment,
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
    const comments = await Comment.find().exec();

    res.json({
      status: true,
      payload: {
        comments,
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
    const comment = await Comment.findOne({ _id: id }).exec();

    res.json({
      status: true,
      payload: {
        comment,
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
    const comment = await Comment.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec();

    res.json({
      status: true,
      payload: {
        comment,
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
    const comment = await Comment.findOneAndRemove({ _id: id }).exec();

    res.json({
      status: true,
      payload: {
        comment,
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
    const features = await new APIFeatutes(Comment.find({ productId }), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const comments = await features.query;

    res.json({
      status: true,
      payload: {
        comments,
        total: features.total,
        totalPage: Math.ceil(features.total / features.limit),
        currentPage: features.page,
        perPage: features.limit,
      },
    });
  } catch (error) {}
};
