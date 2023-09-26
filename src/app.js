import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"
import placeRoutes from "./routes/placeRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";


const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(`${path.resolve()}/uploads`));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

console.log(process.env.MONGO_URL);
mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("not connected to db");
  });

app.use("/", authRoutes);
app.use("/", uploadRoutes);
app.use("/", placeRoutes);
app.use("/", bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
