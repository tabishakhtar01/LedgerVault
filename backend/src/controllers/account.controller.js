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

async function getUserAccountTransactions(req, res) {
  const accountId = req.params.accountId;
  if (!accountId) {
    return res.status(400).json({
      message: "Account ID is required",
    });
  }

  const account = await accountModel.findOne({
    _id: accountId,
    user: req.user._id,
    status: "ACTIVE",
  });

  if (!account) {
    return res.status(404).json({
      message: "Active account not found for the user",
    });
  }

  const transactions = await account.getTransactions();

  res.status(200).json({
    message: "Transactions retrieved successfully",
    transactions,
  });
}

async function getUserAccounts(req, res) {
  const accounts = await accountModel.find({
    user: req.user._id,
  });
  if (!accounts || accounts.length == 0) {
    return res.status(404).json({
      message: "No account found for this user",
    });
  }
  res.status(200).json({
    message: "Accounts retrieved successfully",
    accounts,
  });
}

module.exports = {
  createUserAccount,
  getUserAccountBalance,
  getUserAccountTransactions,
  getUserAccounts,
};
