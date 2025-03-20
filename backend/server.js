import express from "express";
import colors from "colors";
import morgan from "morgan";
import connectDb from "./Config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
//config env
dotenv.config();
// database
connectDb();
//rest object
const app = express();
//
// middleawre
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

// auth Routes
app.use("/api/v1/auth", authRoutes);
// category
app.use("/api/v1/category", categoryRoutes);
// product Routes
app.use("/api/v1/product", productRoutes);
//rest apis
app.get("/", (req, res) => {
  res.send("<h1>Welcome To Ecommerce</h1>");
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`.bgCyan.white);
});
