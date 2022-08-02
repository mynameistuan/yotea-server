import mongoose, { Types } from "mongoose";
const { ObjectId } = Types;

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
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

commentSchema.pre(/^find/, function (next) {
  this.populate("user").populate("rating");

  next();
});

commentSchema.virtual("user", {
  ref: "User",
  foreignField: "_id",
  localField: "userId",
  justOne: true,
});

commentSchema.virtual("rating", {
  ref: "Rating",
  foreignField: ["productId", "userId"],
  localField: ["productId", "userId"],
  justOne: true,
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
