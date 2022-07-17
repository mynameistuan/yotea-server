import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: process.env.DEFAULT_AVATAR,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    timeOpen: {
      type: String,
      required: true,
    },
    timeClose: {
      type: String,
      required: true,
    },
    map: {
      type: String,
      required: true,
    },
    currentStore: {
      // địa chỉ hiển thị trên menu - footer
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Store = mongoose.model("Store", storeSchema);
export default Store;
