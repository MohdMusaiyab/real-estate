import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
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
// Initially we are not allowed to send JSON data to our server
// So we need to add this line
app.use(express.json());
app.listen(3000, () => {
  console.log("Server is Listening on port 3000");
});

// Now our routes
// The below  was for users
app.use("/api/v1/user",userRoute);

// For sign Up and Authentication
app.use("/api/v1/auth",authRoute);

//Making a Middleware for Error Handling
app.use((err,req,res,next)=>{
    const statsuCode=err.statusCode||500;
    const message=err.message||" Internal Server Error";
    return res.status(statsuCode).send({
        success:false,
        message:message,
        statsuCode:statsuCode,
    });
});