import mongoose, { Types } from "mongoose";
const { ObjectId } = Types;

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    storeId: {
      type: ObjectId,
      ref: "Store",
      required: true,
    },
    reply: String,
    userIdReply: {
      type: ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: Number,
      default: 0, // 0: chưa phản hồi, 1: đã phản hồi
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

feedbackSchema.pre(/^find/, function (next) {
  this.populate("store");

  next();
});

feedbackSchema.virtual("store", {
  ref: "Store",
  foreignField: "_id",
  localField: "storeId",
  justOne: true,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
