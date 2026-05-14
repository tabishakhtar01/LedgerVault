const express = require("express");

const router = express.Router();
const accountMiddleware = require("../middlewares/account.middleware");
const transactionController = require("../controllers/transaction.controller");

/**
 * POST /api/transactions
 * - create a new transaction
 */

router.post(
  "/",
  accountMiddleware.accountMiddleware,
  transactionController.createTransaction,
);
router.post(
  "/system/initial-transaction",
  accountMiddleware.systemAccountMiddleware,
  transactionController.createInitialTransaction,
);

module.exports = router;
