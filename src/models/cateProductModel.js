import mongoose from "mongoose";
import slugify from "slugify";
import { convertToSlug } from "../../utils/convertToSlug";

const categorySchema = new mongoose.Schema(
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
    slug: String,
  },
  { timestamps: true },
);

categorySchema.pre("save", function (next) {
  this.slug = convertToSlug(this.name);

  next();
});

categorySchema.pre("findOneAndUpdate", function (next) {
  const slug = convertToSlug(this.getUpdate().name);

  this.findOneAndUpdate({}, { $set: { slug } });
  next();
});

const CateProduct = mongoose.model("CategoryProduct", categorySchema);
export default CateProduct;
