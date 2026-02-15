const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")
const accountModel = require("../models/account.model")
const emailService = require("../services/email.service")



async function createTransaction(req,res){
    /**
     * Validate request body
     */
    const {fromAccount, toAccount, amount, idempotencyKey} = req.body


    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        return res.status(400).json({
            message: "All fields are required",
            status: "failed"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount,

    })
    const toUserAccount = await accountModel.findOne({
        _id: toAccount
    })
    if(!fromUserAccount || !toUserAccount){
        return res.status(400).json({
            message: "From account or to account not found",
            status: "failed"
        })
    }

    /** 
     * 
     */



}