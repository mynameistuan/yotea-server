import mongoose, { Types } from "mongoose";
const { ObjectId } = Types;

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      // địa chỉ cụ thể: vd SN 5, ngách 25/22
      type: String,
      required: true,
    },
    wardCode: {
      type: Number,
      required: true,
    },
    districtCode: {
      type: Number,
      required: true,
    },
    provinceCode: {
      type: Number,
      required: true,
    },
    message: String,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

addressSchema.pre(/^find/, function (next) {
  this.populate("province").populate("district").populate("ward");

  next();
});

addressSchema.virtual("province", {
  ref: "Province",
  foreignField: "code",
  localField: "provinceCode",
  justOne: true,
});

addressSchema.virtual("district", {
  ref: "District",
  foreignField: "code",
  localField: "districtCode",
  justOne: true,
});

addressSchema.virtual("ward", {
  ref: "Ward",
  foreignField: "code",
  localField: "wardCode",
  justOne: true,
});

addressSchema.virtual("fullAddress").get(function () {
  return `${this.address}, ${this.ward.name}, ${this.district.name}, ${this.province.name}`;
});

const Address = mongoose.model("Address", addressSchema);
export default Address;
