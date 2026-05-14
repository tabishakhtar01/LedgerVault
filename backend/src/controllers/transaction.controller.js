const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");
const emailService = require("../services/email.service");
const accountModel = require("../models/account.model");
const userModel = require("../models/user.model");
const mongoose = require("mongoose");

async function createTransaction(req, res) {
  /**
 1. Validate request
 2. Validate idempotency key
 3. Check account status
 4. Derive sender balance from ledger
 5. Create transaction (PENDING)
 6. Create DEBIT ledger entry
 7. Create CREDIT ledger entry
 8. Mark transaction COMPLETED
 9. Commit MongoDB session
 10. Send email notification
 * 
 */

  //   1. Validate request
  const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

  if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const fromUserAccount = await accountModel.findOne({
    _id: fromAccount,
  });

  const toUserAccount = await accountModel.findOne({
    _id: toAccount,
  });

  if (!fromUserAccount || !toUserAccount) {
    return res.status(400).json({
      message: "Sender or reciever account does not exist",
    });
  }

  // 2. Validate idempotency key

  const isTransacationAlreadyExist = await transactionModel.findOne({
    idempotencyKey: idempotencyKey,
  });

  if (isTransacationAlreadyExist) {
    if (isTransacationAlreadyExist.status == "COMPLETED") {
      return res.status(200).json({
        message: "Transaction already processed",
        transaction: isTransacationAlreadyExist,
      });
    }

    if (isTransacationAlreadyExist.status == "PENDING") {
      return res.status(200).json({
        message: "Transaction pending, Please wait",
        transaction: isTransacationAlreadyExist,
      });
    }

    if (isTransacationAlreadyExist.status == "FAILED") {
      return res.status(500).json({
        message: "Transaction failed, please retry",
        transaction: isTransacationAlreadyExist,
      });
    }

    if (isTransacationAlreadyExist.status == "REVERSED") {
      return res.status(500).json({
        message: "Transaction reversed, please retry",
        transaction: isTransacationAlreadyExist,
      });
    }
  }

  //   3. Check account status
  if (
    fromUserAccount.status !== "ACTIVE" ||
    toUserAccount.status !== "ACTIVE"
  ) {
    return res.status(400).json({
      message: "Sender or reciever account status is not active",
    });
  }

  //   4. Derive sender balance from ledger

  const balance = await fromUserAccount.getBalance();

  if (balance < amount) {
    return res.status(400).json({
      message: `Insufficient balance. Your current balance is ${balance} and your requested amount is ${amount}`,
    });
  }

  //    5. Create transaction (PENDING)

  const session = await mongoose.startSession();
  session.startTransaction();

  const transaction = await transactionModel.create(
    [
      {
        fromAccount,
        toAccount,
        amount,
        idempotencyKey,
        status: "PENDING",
      },
    ],
    { session },
  );

  const creditLedgerEntry = await ledgerModel.create(
    [
      {
        account: toAccount,
        amount,
        transaction: transaction[0]._id,
        type: "CREDIT",
      },
    ],
    { session },
  );

  const debitLedgerEntry = await ledgerModel.create(
    [
      {
        account: fromAccount,
        amount,
        transaction: transaction[0]._id,
        type: "DEBIT",
      },
    ],
    { session },
  );

  transaction[0].status = "COMPLETED";
  await transaction[0].save({ session });

  await session.commitTransaction();
  session.endSession();

  res.status(201).json({
    message: "Transaction successful",
    transaction: transaction[0],
  });

  emailService.sendTransactionEmail(
    fromUserAccount.user.email,
    fromUserAccount.user.name,
    amount,
    "DEBIT",
  );

  emailService.sendTransactionEmail(
    toUserAccount.user.email,
    toUserAccount.user.name,
    amount,
    "CREDIT",
  );
}

async function createInitialTransaction(req, res) {
  const { toAccount, amount, idempotencyKey } = req.body;
  if (!toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const toUserAccount = await accountModel.findOne({
    _id: toAccount,
  });

  if (!toUserAccount) {
    return res.status(400).json({
      message: "Reciever account does not exist",
    });
  }

  if (toUserAccount.status !== "ACTIVE") {
    return res.status(400).json({
      message: "Reciever account status is not active",
    });
  }

  const fromUserAccount = await accountModel.findOne({
    user: null,
    user: req.user._id,
  });

  if (!fromUserAccount) {
    return res.status(400).json({
      message: "Sender account does not exist",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  const transaction = await transactionModel.create(
    [
      {
        fromAccount: fromUserAccount._id,
        toAccount,
        amount,
        idempotencyKey,
        status: "PENDING",
      },
    ],
    { session },
  );

  const creditLedgerEntry = await ledgerModel.create(
    [
      {
        account: toAccount,
        amount,
        transaction: transaction[0]._id,
        type: "CREDIT",
      },
    ],
    { session },
  );

  const debitLedgerEntry = await ledgerModel.create(
    [
      {
        account: fromUserAccount._id,
        amount,
        transaction: transaction[0]._id,
        type: "DEBIT",
      },
    ],
    { session },
  );

  transaction[0].status = "COMPLETED";
  await transaction[0].save({ session });

  await session.commitTransaction();
  session.endSession();

  res.status(201).json({
    message: "Initial Transaction successful",
    transaction: transaction[0],
  });

  emailService.sendTransactionEmail(
    fromUserAccount.user.email,
    fromUserAccount.user.name,
    amount,
    "DEBIT",
  );

  emailService.sendTransactionEmail(
    toUserAccount.user.email,
    toUserAccount.user.name,
    amount,
    "CREDIT",
  );
}

module.exports = {
  createTransaction,
  createInitialTransaction,
};
