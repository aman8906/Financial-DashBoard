const Portfolio = require("../models/Portfolio");
const Order = require("../models/Order");

// ================= PORTFOLIO =================

exports.getPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;

    const portfolio = await Portfolio.find({ userId }).sort({ buyDate: -1 });

    res.json(portfolio); // send all rows

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= ORDERS =================

exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders); // send all rows

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
