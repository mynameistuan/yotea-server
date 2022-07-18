import mongoose from "mongoose";
import Address from "../models/addressModel";
import CatePost from "../models/catePostModel";
import CateProduct from "../models/cateProductModel";
import Favorite from "../models/favoriteModel";
import Order from "../models/orderModel";
import OrderDetail from "../models/orderDetailModel";
import Post from "../models/postModel";
import Product from "../models/productModel";
import Size from "../models/sizeModel";
import Slider from "../models/sliderModel";
import Topping from "../models/toppingModel";
import User from "../models/userModel";
import Voucher from "../models/voucherModel";
import OrderLog from "../models/orderLogModel";
import Store from "../models/storeModel";
import Feedback from "../models/feedbackModel";
import Province from "../models/provinceModel";
import District from "../models/districtModel";
import Ward from "../models/wardModel";

const modelList = [
  Product,
  CateProduct,
  CatePost,
  Post,
  Size,
  Slider,
  Topping,
  User,
  Address,
  Favorite,
  Voucher,
  Order,
  OrderDetail,
  OrderLog,
  Store,
  Feedback,
  Province,
  District,
  Ward,
];

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
