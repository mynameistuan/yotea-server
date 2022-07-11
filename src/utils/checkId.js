import mongoose from "mongoose";
import CatePost from "../models/catePostModel";
import CateProduct from "../models/cateProductModel";
import Post from "../models/postModel";
import Product from "../models/productModel";
import Size from "../models/sizeModel";
import Slider from "../models/sliderModel";

const modelList = [Product, CateProduct, CatePost, Post, Size, Slider];

export const checkIdExits = async (req, res, next, id) => {
  // check id valid
  const status = mongoose.Types.ObjectId.isValid(id);
  if (status) {
    let isIdValid = false;
    for await (let model of modelList) {
      const count = await model.countDocuments({ _id: id }).exec();

      if (count) isIdValid = true;
    }

    if (isIdValid) {
      next();
      return;
    }
    return res.status(404).json({
      status: false,
      message: "Id không tồn tại",
    });
  }

  return res.status(404).json({
    status: false,
    message: "Id không tồn tại",
  });
};
