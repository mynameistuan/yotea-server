import { convertToSlug } from "../utils/convertToSlug";

const { default: mongoose } = require("mongoose");

const catePostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: String,
  },
  { timestamps: true },
);

catePostSchema.pre("save", function (next) {
  this.slug = convertToSlug(this.name);

  next();
});

catePostSchema.pre("findOneAndUpdate", function (next) {
  const dataUpdate = this.getUpdate();
  const slug = convertToSlug(dataUpdate.name);

  dataUpdate.slug = slug;
  next();
});

const CatePost = mongoose.model("CatePost", catePostSchema);
export default CatePost;
