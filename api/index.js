import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Databse");
  })
  .catch((err) => {
    console.log("Connection Failed");
    console.log(err);
  });
const app = express();

app.listen(3000, () => {
  console.log("Server is Listening on port 3000");
});

// Now our routes
app.use("/api/v1/user",userRoute);