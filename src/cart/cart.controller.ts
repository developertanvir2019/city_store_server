import { Request, Response } from "express";
import Cart from "./cart.model";
import Wishlist from "../wishlist/wishlist.model";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userEmail, productId } = req.body;

    // Check if the product is already in the cart
    const existingCartItem = await Cart.findOne({ userEmail, productId });

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      existingCartItem.quantity += 1;
      await existingCartItem.save();

      // Remove the product from the wishlist (if it exists)
      await Wishlist.findOneAndDelete({ userEmail, productId });

      return res.status(200).json({
        message: "Product quantity updated in the cart",
      });
    }

    // If the product is not in the cart, add it
    const cartItem = new Cart({
      userEmail,
      productId,
    });

    await cartItem.save();

    // Remove the product from the wishlist (if it exists)
    await Wishlist.findOneAndDelete({ userEmail, productId });

    res.status(201).json({ message: "Product added to the cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to the cart" });
  }
};

export const getUserCart = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.params;

    const cartItems = await Cart.aggregate([
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

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user wishlist" });
  }
};

export const deleteFromCart = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found in the Cart" });
    }
    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
};
