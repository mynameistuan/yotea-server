import mongoose, { Types } from "mongoose";
const { ObjectId } = Types;

const orderLogSchema = new mongoose.Schema(
  {
    orderId: {
      type: ObjectId,
      required: true,
      ref: "Order",
    },
    userId: {
      type: ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

orderLogSchema.pre(/^find/, function (next) {
  this.populate("order").populate("user");

  next();
});

orderLogSchema.virtual("order", {
  ref: "Order",
  foreignField: "_id",
  localField: "orderId",
  justOne: true,
});

orderLogSchema.virtual("user", {
  ref: "User",
  foreignField: "_id",
  localField: "userId",
  justOne: true,
});

const OrderLog = mongoose.model("OrderLog", orderLogSchema);
export default OrderLog;
