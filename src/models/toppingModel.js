import mongoose from "mongoose";

const toppingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Topping = mongoose.model("Topping", toppingSchema);
export default Topping;
