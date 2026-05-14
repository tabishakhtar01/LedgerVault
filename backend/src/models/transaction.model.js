const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "Transaction must be assiciated with the from account"],
      index: true,
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "Transaction must be assiciated with the to account"],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
        message: "Status can either be PENDING, COMPLETED , FAILED or REVERSED",
      },
      default: "PENDING",
    },
    amount: {
      type: Number,
      min: [0, "Amount can not be negative"],
      required: [true, "Amount is required for transaction"],
    },
    idempotencyKey: {
      type: String,
      required: [true, "Idempotency Key is required for transaction"],
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;
