import express from "express";
import { login, signup } from "./user.controller";

const router = express.Router();

// User Registration (Signup)
router.post("/signup", signup);

// User Login
router.post("/login", login);

export default router;
