import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import customerRoutes from "../routes/customer.routes.js";

// import { createTransaction } from "../controllers/transaction.controller.js";
import adminRoutes from "../routes/admin.routes.js";
import categoryRoutes from "../routes/category.routes.js";
import deliveryRouter from "../routes/delivery.routes.js";
import distributerRouter from "../routes/distributer.routes.js";
import farmerRoutes from "../routes/farmer.routes.js";
import orderRouter from "../routes/order.routes.js";
import productRouter from "../routes/product.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use("/public", express.static("public"));

app.use("/api/v1/customers", customerRoutes);
// app.use("/api/v1/transaction", createTransaction);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/farmers", farmerRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/products", productRouter);
// app.use("/api/v1/users", paymentRouter);
app.use("/api/v1/distributers", distributerRouter);
app.use("/api/v1/deliveries", deliveryRouter);

export { app };

