import mongoose, { Types } from "mongoose";
const { ObjectId } = Types;

const ratingSchema = new mongoose.Schema(
  {
    ratingNumber: {
      type: Number,
      required: true,
    },
    productId: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
