import mongoose, { Types } from "mongoose";
const { ObjectId } = Types;

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      // địa chỉ cụ thể: vd SN 5, ngách 25/22
      type: String,
      required: true,
    },
    wardCode: {
      type: Number,
      required: true,
    },
    districtCode: {
      type: Number,
      required: true,
    },
    provinceCode: {
      type: Number,
      required: true,
    },
    message: String,
  },
  { timestamps: true },
);

const Address = mongoose.model("Address", addressSchema);
export default Address;
