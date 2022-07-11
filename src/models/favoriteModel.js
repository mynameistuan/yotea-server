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
  { timestamps: true },
);

const Favorite = mongoose.model("Favorite", favoriteSchema);
export default Favorite;
