import express from "express";
import {
  addToWishlist,
  deleteFromWishlist,
  getUserWishlist,
} from "./wishlist.controller";

const router = express.Router();

// Add a product to the user's wishlist
router.post("/add", addToWishlist);

// Get specific user's wishlist products by email
router.get("/user/:userEmail", getUserWishlist);
router.delete("/:itemId", deleteFromWishlist);

export default router;
