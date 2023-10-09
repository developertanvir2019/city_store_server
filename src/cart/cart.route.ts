import express from "express";
import { addToCart, deleteFromCart, getUserCart } from "./cart.controller";

const router = express.Router();

// Add a product to the user's cart
router.post("/add", addToCart);
router.get("/user/:userEmail", getUserCart);
router.delete("/:itemId", deleteFromCart);

export default router;
