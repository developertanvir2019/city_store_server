import mongoose from "mongoose";
require("dotenv").config();
import express from "express";
import { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";

const app = express();

app.use(json());
app.use(signinRouter);
app.use(signupRouter);
const port = process.env.port || 5000;

app.get("/", async (req, res) => {
  res.send("server is running");
});

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
});
