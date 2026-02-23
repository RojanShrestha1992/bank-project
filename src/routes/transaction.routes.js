const {Router} = require('express')
const authMiddleware = require("../middleware/auth.middleware")
const transactionRoutes = Router()
const transactionController = require("../controllers/transaction.controller")


/**
 * post api/transactions
 */

transactionRoutes.post("/", authMiddleware.authMiddleware, transactionController.createTransaction) 





module.exports = transactionRoutes