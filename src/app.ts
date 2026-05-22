import express, { type Request, type Response } from "express";
import multer from "multer";
import bodyParser from "body-parser";
import config from "./config/config.js";
import todosRoute from "./routes/todoRoute.js";
import productRoutes from "./routes/productRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import connectDB from "./config/database.js";
import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

connectDB();
connectCloudinary();

app.use(bodyParser.json());
app.use(logger);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    name: config.name,
    port: config.port,
    version: config.version,
    status: "OK",
  });
});

app.use("/api/products", upload.array("images", 5), productRoutes);
app.use("/api/orders", auth, orderRoutes);
app.use("/api/users", auth, upload.single("image"), userRoutes);
app.use("/todos", todosRoute);
app.use("/api/auth", authRoutes);

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}...`);
});
