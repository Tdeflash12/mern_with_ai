import express from "express";
import bodyParser from "body-parser";
import config from "./config/config.js";
import todosRoute from "./routes/todoRoute.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";
import roleBasedAuth from "./middleware/roleBasedAuth.js";
import { ADMIN } from "./constants/roles.js";


const app = express();
connectDB();
app.use(bodyParser.json());
app.use(logger)

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.port,
    version: config.version,
    status: "OK",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/users",auth,roleBasedAuth(ADMIN),userRoutes);
app.use("/todos", todosRoute);
app.use("/api/auth", authRoutes);

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}...`);
});
