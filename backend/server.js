
import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import homeTopProductRoutes from "./routes/homeTopProduct.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

dotenv.config();

// --------------------
// App & Server
// --------------------
const app = express();
const server = http.createServer(app);

// --------------------
// Socket.io setup
// --------------------
export const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Admin connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Admin disconnected:", socket.id);
  });
});

// --------------------
// Database
// --------------------
console.log("MONGO_URI =>", process.env.MONGO_URI);
connectDB();

// --------------------
// Middleware
// --------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://192.168.0.102:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));



// --------------------
// Routes
// --------------------
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/home-top-products", homeTopProductRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/dashboard", dashboardRoutes);

// --------------------
// Test Route
// --------------------
app.get("/", (req, res) => {
  res.send("API Running...");
});

// --------------------
// Start Server (IMPORTANT)
// --------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
