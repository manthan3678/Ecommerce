import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process ",
      enum: ["Not Process", "Processing", "Shipped", "Deliverd", "Cance"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Orders", orderSchema);
