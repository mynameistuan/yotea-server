import mongoose, { Types } from "mongoose";
const { ObjectId } = Types;
import { formatCurrency } from "../utils/string";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    address: {
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
    totalPrice: {
      type: Number,
      required: true,
    },
    priceDecrease: {
      type: Number,
      required: true,
    },
    message: String,
    status: {
      type: Number,
      default: 0,
    },
    voucher: {
      type: [ObjectId],
      ref: "Voucher",
      default: [],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

orderSchema.pre(/^find/, function (next) {
  this.populate("voucher");

  next();
});

orderSchema.virtual("voucherText").get(function () {
  const voucherList = this.voucher;
  let voucherText = "";

  voucherList.forEach((voucher) => {
    if (voucher.condition === 0) {
      // giảm theo %
      voucherText += `${voucher.code} (Giảm ${voucher.conditionNumber}%), `;
    } else {
      voucherText += `${voucher.code} (Giảm ${formatCurrency(voucher.conditionNumber)}), `;
    }
  });

  return voucherText.slice(0, -2);
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
