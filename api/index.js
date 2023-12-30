import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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
