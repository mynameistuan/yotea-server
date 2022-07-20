import Favorite from "../models/favoriteModel";
import User from "../models/userModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let favorite;
    let status = 201;
    // check user favorite product
    const isFavorite = await Favorite.findOne({ userId, productId }).exec();
    if (isFavorite) {
      favorite = await Favorite.findOneAndDelete({ userId, productId }).exec();
      status = 200;
    } else {
      favorite = await new Favorite(req.body).save();
      favorite = await Favorite.findOne({ _id: favorite._id }).exec();
    }

    res.status(status).json({
      status: true,
      payload: {
        favorite,
        isFavorite: !!isFavorite,
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
    const features = await new APIFeatutes(Favorite, req.query).filter().sort().limitFields().paginate();
    const favorites = await features.query;

    res.json({
      status: true,
      payload: {
        favorites,
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
    const favorite = await Favorite.findOne({ _id }).exec();

    res.json({
      status: true,
      payload: {
        favorite,
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
    const favorite = await Favorite.findOneAndUpdate({ _id: id }, req.body, { new: true });

    res.json({
      status: true,
      payload: {
        favorite,
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
    const favorite = await Favorite.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
        favorite,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const getMyWishList = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email }).exec();

    if (!user) {
      res.status(404).json({
        status: false,
        message: "User not found!",
      });
      return;
    }

    const favorites = await Favorite.find({ userId: user._id }).exec();

    res.json({
      status: true,
      payload: {
        favorites,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
