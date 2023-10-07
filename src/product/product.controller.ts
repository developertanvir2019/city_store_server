import { Request, Response } from "express";
import Product from "./product.model";

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { img, title, description, category, rating, oldPrice, newPrice } =
      req.body;

    const product = new Product({
      img,
      title,
      description,
      category,
      rating,
      oldPrice,
      newPrice,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Product creation failed" });
  }
};

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
