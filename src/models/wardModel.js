import mongoose, { Types } from "mongoose";
const { ObjectId } = Types;

const wardSchema = new mongoose.Schema(
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
    district_code: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Ward = mongoose.model("Ward", wardSchema);
export default Ward;
