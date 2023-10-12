import mongoose from "mongoose";
require("dotenv").config();
import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import userRouter from "./authentication/user.router";
import productRoutes from "./product/product.routes";
import wishListRoutes from "./wishlist/wishlist.routes";
import cartRoutes from "./cart/cart.route";
import { scheduleJob } from "node-schedule";
const app = express();

app.use(json());
app.use(cors());
const port = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.send(" city store server is running ");
});

app.use("/api/user", userRouter);
app.use("/api/product", productRoutes);
app.use("/api/wishlist", wishListRoutes);
app.use("/api/cart", cartRoutes);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  return next(new Error("Invalid route"));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: err.message || "an unknown error occurred!",
  });
});

// Connecting to Mongodb
const uri: any = process.env.mongodbUrl;
const initializeConfig = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, async () => {
  await initializeConfig();
  console.log(`Listening on port ${port}!!!!!`);
  const selfPing = scheduleJob("*/10 * * * *", async () => {
    try {
      console.log("Pinging");
      await fetch("https://city-server-cwdm.onrender.com"); // Replace 'your render url here' with the URL you want to ping
      console.log("Pinging Done");
    } catch (error) {
      console.log({
        message: "There is an error from the scheduler",
        error: error,
      });
    }
  });
});
