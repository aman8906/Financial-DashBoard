import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    // Excel Users-id (ex: client101)
    userId: {
      type: String,
      required: true,
      index: true
    },

    buyDate: {
      type: Date,
      default: null
    },

    script: {
      type: String,
      required: true,
      trim: true
    },

    buyPrice: {
      type: Number,
      default: 0
    },

    qty: {
      type: Number,
      default: 0
    },

    total: {
      type: Number,
      default: 0
    },

    buyBrokerage: {
      type: Number,
      default: 0
    },

    sellDate: {
      type: Date,
      default: null
    },

    sellPrice: {
      type: Number,
      default: 0
    },

    sellQty: {
      type: Number,
      default: 0
    },

    sellTotal: {
      type: Number,
      default: 0
    },

    sellBrokerage: {
      type: Number,
      default: 0
    },

    grossPNL: {
      type: Number,
      default: 0
    },

    netPNL: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// 🚀 Fast queries for dashboard (newest first)
portfolioSchema.index({ userId: 1, buyDate: -1 });

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
