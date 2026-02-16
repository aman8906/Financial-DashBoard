import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import orderRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";
import { watchExcelFile } from "./utils/excelWatcher.js";
import Portfolio from "./models/Portfolio.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", dataRoutes);
app.use("/api/orders", orderRoutes);



// ================= SOCKET REALTIME =================

io.on("connection", (socket) => {

  console.log("Client connected:", socket.id);

  socket.on("joinRoom", async (userId) => {

    

    if (!userId) return;

    socket.join(userId);
    console.log("User joined room:", userId);

    try {

      // 🔥 Always fetch sorted user data
      const userData = await Portfolio.find({ userId })
        .sort({ buyDate: -1 })
        .lean();

      // Send immediately on join
      socket.emit("excelUpdated", userData);

    } catch (err) {

      console.error("Socket fetch error:", err);
      socket.emit("excelUpdated", []);

    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

});


// ================= EXCEL WATCHER FIX =================

watchExcelFile(io);


// ================= SERVER =================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
