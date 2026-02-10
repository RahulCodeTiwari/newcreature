// import http from "http";
// import { Server } from "socket.io";
// import app from "./app.js"
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// // Routes
// import homeTopSubCategoryRoutes from "./routes/homeTopSubCategory.routes.js";
// import authRoutes from "./routes/auth.routes.js";
// import categoryRoutes from "./routes/category.routes.js";
// import subcategoryRoutes from "./routes/subcategory.routes.js";
// import contactRoutes from "./routes/contact.routes.js";
// import blogRoutes from "./routes/blog.routes.js";
// import dashboardRoutes from "./routes/dashboard.routes.js";

// const server = http.createServer(app);

// export const io = new Server(server, {
//   cors: {
//     origin: "*",
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Admin connected:", socket.id);
// });


// dotenv.config();

// // ✅ Connect to MongoDB

// connectDB();

// const app = express();

// // ✅ CORS setup
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173", // frontend
//       "http://localhost:5174", // admin
//       "http://192.168.0.102:5173", // LAN frontend
//     ],
//     credentials: true, // if sending cookies / tokens
//   })
// );

// // ✅ Body parsers
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Static folder for uploads
// app.use("/uploads", express.static("uploads"));

// // ✅ API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/subcategories", subcategoryRoutes);
// app.use("/api/home-top-subcategories", homeTopSubCategoryRoutes);
// app.use("/api/contacts", contactRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/dashboard", dashboardRoutes)

// // ✅ Test route
// app.get("/", (req, res) => {
//   res.send("API Running...");
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () =>
//   console.log(`Server running on port ${PORT}`)
// );

// export default app;


import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import homeTopSubCategoryRoutes from "./routes/homeTopSubCategory.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import subcategoryRoutes from "./routes/subcategory.routes.js";
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
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/home-top-subcategories", homeTopSubCategoryRoutes);
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
