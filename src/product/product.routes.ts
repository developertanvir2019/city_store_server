import express from "express";
import { createProduct, getProducts } from "./product.controller";

const router = express.Router();

// Create a new product
router.post("/create", createProduct);

// Get all products
router.get("/list", getProducts);

export default router;
