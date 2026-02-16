import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true
    },

    stock: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true
    },

    qty: {
      type: Number,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    total: {
      type: Number,
      default: function () {
        return this.qty * this.price;
      }
    },

    pnl: {
      type: Number,
      default: 0
    },

    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
