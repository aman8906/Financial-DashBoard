import express from "express";
import Portfolio from "../models/Portfolio.js";

const router = express.Router();

// ✅ Get ALL portfolio rows of a specific user
router.get("/portfolio/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const portfolio = await Portfolio
      .find({ userId })
      .sort({ buyDate: -1 })   // latest first
      .lean();                // faster, plain JSON

    res.status(200).json(portfolio); // always array

  } catch (err) {
    console.error("Portfolio fetch error:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});

export default router;
