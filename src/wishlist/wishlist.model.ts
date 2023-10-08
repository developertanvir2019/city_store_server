import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema({
  userEmail: { type: String, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

export default mongoose.model("Wishlist", wishlistSchema);
