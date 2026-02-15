const {Router} = require('express')
const authMiddleware = require("../middleware/auth.middleware")
const transactionRoutes = Router()



transactionRoutes.post("/", authMiddleware) 
module.exports = transactionRoutes