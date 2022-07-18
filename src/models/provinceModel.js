import mongoose from "mongoose";

const provinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    division_type: String,
    codename: String,
    phone_code: Number,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

provinceSchema.pre(/findOne/, function (next) {
  this.populate("districts");

  next();
});

provinceSchema.virtual("districts", {
  ref: "District",
  foreignField: "province_code",
  localField: "code",
});

const Province = mongoose.model("Province", provinceSchema);
export default Province;
