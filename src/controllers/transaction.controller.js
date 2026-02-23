const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");
const accountModel = require("../models/account.model");
const emailService = require("../services/email.service");

async function createTransaction(req, res) {
  /**
   * Validate request body
   */
  const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

  if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({
      message: "All fields are required",
      status: "failed",
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
      message: "From account or to account not found",
      status: "failed",
    });
  }

  /**
   * validate idempotency key
   */

  const isTransactionExist = await transactionModel.findOne({
    idempotencyKey: idempotencyKey,
  });

  if (isTransactionExist) {
    if (isTransactionExist.status === "COMPLETED") {
      return res.status(200).json({
        message: "Transaction already completed",
        transaction: isTransactionExist,
      });
    }

    if (isTransactionExist.status === "PENDING") {
      return res.status(200).json({
        message: "Transaction is pending",
      });
    }

    if (isTransactionExist.status === "FAILED") {
      return res.status(500).json({
        message: "Transaction failed",
      });
    }

    if (isTransactionExist.status === "REVERSED") {
      return res.status(200).json({
        message: "Transaction already reversed",
      });
    }
  }

  /**
   * check account status
   */

  if (
    fromUserAccount.status !== "ACTIVE" ||
    toUserAccount.status !== "ACTIVE"
  ) {
    return res.status(400).json({
      message: "From account or to account is not active",
    });
  }

  /**
   * derive sender balance from ledger
   */

  const balance = await fromUserAccount.getBalance();
  if (balance < amount) {
    return res.status(400).json({
      message: `Insufficient balance. Current balance is ${balance}, required balance is ${amount}`,
    });
  }
}
