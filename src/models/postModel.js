import mongoose, { Types } from "mongoose";
const { ObjectId } = Types;
import { convertToSlug } from "../utils/convertToSlug";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    categoryId: {
      type: ObjectId,
      ref: "CatePost",
    },
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    slug: String,
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);
postSchema.index({ "$**": "text" });

postSchema.pre("save", function (next) {
  this.slug = convertToSlug(this.title);

  next();
});

postSchema.pre("findOneAndUpdate", function (next) {
  const dataUpdate = this.getUpdate();

  dataUpdate.slug = convertToSlug(dataUpdate.title);
  next();
});

postSchema.virtual("category", {
  ref: "CatePost",
  foreignField: "_id",
  localField: "categoryId",
  justOne: true,
});

postSchema.virtual("author", {
  ref: "User",
  foreignField: "_id",
  localField: "userId",
  justOne: true,
});

postSchema.pre(/^find/, function (next) {
  this.populate("category").populate("author");
  next();
});

postSchema.pre("save", function (next) {
  this.populate("category");
  next();
});

const Post = mongoose.model("Post", postSchema);
export default Post;
