import mongoose, { Types } from "mongoose";
const { ObjectId } = Types;

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    productId: {
      type: ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

favoriteSchema.virtual("product", {
  ref: "Product",
  foreignField: "_id",
  localField: "productId",
  justOne: true,
});

favoriteSchema.pre(/^find/, function (next) {
  this.populate("product");

  next();
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
export default Favorite;
