const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Account must be associated with the user"],
      index: true,
      ref: "user",
    },
    status: {
      type: String,
      enum: {
        values: ["ACTIVE", "FROZEN", "INACTIVE"],
        message: "Status can either be ACTIVE, FROZEN or closed",
      },
      default: "ACTIVE",
    },
    currency: {
      type: String,
      required: [true, "Currency is required for creating an account"],
      default: "INR",
    },
  },
  {
    timestamps: true,
  },
);

accountSchema.index({
  user: 1,
  status: 1,
});

accountSchema.methods.getBalance = async function () {
  const ledgerModel = require("./ledger.model");
  const balanceAggregation = await ledgerModel.aggregate([
    {
      $match: {
        account: this._id,
      },
    },

    {
      $group: {
        _id: null,

        totalCredit: {
          $sum: {
            $cond: [{ $eq: ["$type", "CREDIT"] }, "$amount", 0],
          },
        },

        totalDebit: {
          $sum: {
            $cond: [{ $eq: ["$type", "DEBIT"] }, "$amount", 0],
          },
        },
      },
    },

    {
      $project: {
        _id: 0,

        balance: {
          $subtract: ["$totalCredit", "$totalDebit"],
        },

        totalCredit: 1,
        totalDebit: 1,
      },
    },
  ]);

  if (balanceAggregation.length == 0) {
    return 0;
  }

  return balanceAggregation[0].balance;
};

const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel;
