const express = require("express");
const accountController = require("../controllers/account.controller");
const accountMiddleware = require("../middlewares/account.middleware");
const router = express.Router();

router.post(
  "/",
  accountMiddleware.accountMiddleware,
  accountController.createUserAccount,
);
router.get(
  "/:accountId/balance",
  accountMiddleware.accountMiddleware,
  accountController.getUserAccountBalance,
);

module.exports = router;
