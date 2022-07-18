import mongoose from "mongoose";

const districtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    division_type: String,
    codename: String,
    province_code: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

districtSchema.pre(/findOne/, function (next) {
  this.populate("wards");

  next();
});

districtSchema.virtual("wards", {
  ref: "Ward",
  foreignField: "district_code",
  localField: "code",
});

const District = mongoose.model("District", districtSchema);
export default District;
