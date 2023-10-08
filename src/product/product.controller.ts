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

// Get all products with optional filtering and search
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, title, page } = req.query;
    const filter: any = {};
    const perPage = 12;

    if (category) {
      const categoryString = category as string; // Explicitly cast to string
      filter.category = { $regex: new RegExp(categoryString, "i") }; // Case-insensitive search
    }

    if (title) {
      filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    const skip = (parseInt(page as string, 10) - 1) * perPage;

    const products = await Product.find(filter).skip(skip).limit(perPage);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
