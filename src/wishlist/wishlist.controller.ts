// wishlist.controller.js

import { Request, Response } from "express";
import Wishlist from "./wishlist.model";

// Add a product to the user's wishlist
export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { userEmail, productId } = req.body;
    const wishlistItem = new Wishlist({
      userEmail,
      productId,
    });

    await wishlistItem.save();

    res.status(201).json({ message: "Product added to wishlist successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to wishlist" });
  }
};

// Get specific user's wishlist products
export const getUserWishlist = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.params;

    const wishlistItems = await Wishlist.aggregate([
      {
        $match: { userEmail }, // Filter by user's email
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
    ]);

    res.status(200).json(wishlistItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user wishlist" });
  }
};
