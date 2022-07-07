import mongoose, { Types } from "mongoose";
const { ObjectId } = Types;
import { convertToSlug } from "../utils/convertToSlug";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    status: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: ObjectId,
      ref: "CategoryProduct",
    },
    slug: String,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);
productSchema.index({ "$**": "text" });

productSchema.pre("save", function (next) {
  this.slug = convertToSlug(this.name);

  next();
});

productSchema.pre("findOneAndUpdate", function (next) {
  const dataUpdate = this.getUpdate();

  dataUpdate.slug = convertToSlug(dataUpdate.name);
  next();
});

productSchema.virtual("category", {
  ref: "CategoryProduct",
  foreignField: "_id",
  localField: "categoryId",
  justOne: true,
});

productSchema.pre(/^find/, function (next) {
  this.populate("category");
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
