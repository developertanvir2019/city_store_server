import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document {
  img: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  oldPrice: number;
  newPrice: number;
}

const productSchema = new Schema<IProduct>({
  img: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
  newPrice: { type: Number, required: true },
});

export default mongoose.model<IProduct>("Product", productSchema);
