import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { userId, stock, type, qty, price } = req.body;

    if (!userId || !stock || !type || !qty || !price) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const order = await Order.create({
      userId,
      stock,
      type,
      qty,
      price
    });

    res.status(201).json(order);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET ORDER HISTORY (FIXED)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;   // 🔥 IMPORTANT FIX

    const orders = await Order.find({ userId })
      .sort({ date: -1 })
      .lean();

    res.json(orders);
  } catch (err) {
    console.error("Order fetch error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
