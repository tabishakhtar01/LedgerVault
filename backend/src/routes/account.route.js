const express = require("express");
const accountController = require("../controllers/account.controller");
const accountMiddleware = require("../middlewares/account.middleware");
const router = express.Router();

router.post(
  "/create-account",
  accountMiddleware.accountMiddleware,
  accountController.createUserAccount,
);
router.get(
  "/:accountId/balance",
  accountMiddleware.accountMiddleware,
  accountController.getUserAccountBalance,
);

router.get(
  "/:accountId/transactions",
  accountMiddleware.accountMiddleware,
  accountController.getUserAccountTransactions,
);

router.get(
  "/",
  accountMiddleware.accountMiddleware,
  accountController.getUserAccounts,
);

module.exports = router;
