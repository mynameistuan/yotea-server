import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    condition: {
      type: Number,
      required: true,
      enum: [0, 1], // 0: giảm theo %, 1: giảm theo tiền
    },
    conditionNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    timeStart: {
      type: Date,
      required: true,
    },
    timeEnd: {
      type: Date,
      required: true,
    },
    userIds: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

const Voucher = mongoose.model("Voucher", voucherSchema);
export default Voucher;
