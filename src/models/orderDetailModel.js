import mongoose, { Types } from "mongoose";
const { ObjectId } = Types;

const orderDetailSchema = new mongoose.Schema(
  {
    orderId: {
      type: ObjectId,
      ref: "Order",
      required: true,
    },
    productId: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    sizeId: {
      type: ObjectId,
      ref: "Size",
      required: true,
    },
    sizePrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    ice: {
      type: Number,
      required: true,
    },
    sugar: {
      type: Number,
      required: true,
    },
    toppingId: {
      type: ObjectId,
      ref: "Topping",
      required: true,
    },
    toppingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

orderDetailSchema.pre(/^find/, function (next) {
  this.populate("product").populate("size").populate("topping").populate("order");

  next();
});

orderDetailSchema.virtual("product", {
  ref: "Product",
  foreignField: "_id",
  localField: "productId",
  justOne: true,
});

orderDetailSchema.virtual("size", {
  ref: "Size",
  foreignField: "_id",
  localField: "sizeId",
  justOne: true,
});

orderDetailSchema.virtual("topping", {
  ref: "Topping",
  foreignField: "_id",
  localField: "toppingId",
  justOne: true,
});

orderDetailSchema.virtual("order", {
  ref: "Order",
  foreignField: "_id",
  localField: "orderId",
  justOne: true,
});

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);
export default OrderDetail;
