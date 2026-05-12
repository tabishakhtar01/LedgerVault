const accountModel = require("../models/account.model");

async function createUserAccount(req, res) {
  console.log(req.user);
  const account = await accountModel.create({
    user: req.user._id,
  });

  res.status(201).json({
    message: "Account Created",
    account,
  });
}

async function getUserAccountBalance(req, res) {
  const accountId = req.params.accountId;
  const account = await accountModel.findOne({
    _id: accountId,
    user: req.user._id,
    status: "ACTIVE",
  });

  if (!account) {
    return res.status(404).json({
      message: "Active account not found for user",
    });
  }

  const balance = await account.getBalance();

  res.status(200).json({
    message: "Balance retrieved successfully",
    balance,
  });
}

module.exports = { createUserAccount, getUserAccountBalance };
