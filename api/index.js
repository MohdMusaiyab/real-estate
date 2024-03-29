import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import listingRoute from "./routes/listingRoute.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    // console.log("Connected to Databse");
  })
  .catch((err) => {
    console.log("Connection Failed");
    console.log(err);
  });
const __dirname = path.resolve();

const app = express();

app.use(morgan("dev"));

// TO get the information from the cookie
app.use(cookieParser());
// Initially we are not allowed to send JSON data to our server
// So we need to add this line
app.use(express.json());
app.listen(3000, () => {
  // console.log("Server is Listening on port 3000");
});

// Now our routes
// The below  was for users
app.use("/api/v1/user", userRoute);

// For sign Up and Authentication
app.use("/api/v1/auth", authRoute);

//listing router
app.use("/api/v1/listing", listingRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,'client', 'dist', 'index.html'));
});
// app.get("/get",searchListingController)

//Making a Middleware for Error Handling
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;

//   const message = err.message || " Internal Server Error";
//   return res.status(statusCode).send({
//     success: false,
//     message: message,
//     statusCode: statusCode,
//   });
// });

