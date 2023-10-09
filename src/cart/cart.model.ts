import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  userEmail: { type: String, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, default: 1 },
});

export default mongoose.model("Cart", cartSchema);
