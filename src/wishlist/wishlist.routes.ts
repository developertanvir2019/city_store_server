import express from "express";
import { addToWishlist, getUserWishlist } from "./wishlist.controller";

const router = express.Router();

// Add a product to the user's wishlist
router.post("/add", addToWishlist);

// Get specific user's wishlist products by email
router.get("/user/:userEmail", getUserWishlist);

export default router;
