const mongoose = require('mongoose')

const ledgerSchema = new mongoose.Schema({
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Account is required for creating a ledger entry"],
        index: true,
        immutable: true
    },
    amount:{
        type: Number,
        required: [true, "Amount is required for creating a ledger entry"],
        immutable: true
    },
    transaction:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction",
        required: [true, "Transaction is required for creating a ledger entry"],
        index: true,
        immutable: true
    },
    type:{
        type: String,
        enum: {
            values: ["DEBIT", "CREDIT"],
            message: "Type must be either DEBIT or CREDIT"
        },
        required: [true, "Type is required for creating a ledger entry"],
        immutable: true
    }
})


function preventLegderModification(){
    throw new Error("Ledger entries cannot be modified or deleted")
}

ledgerSchema.pre("findOneAndUpdate", preventLegderModification)
ledgerSchema.pre("findOneAndDelete", preventLegderModification)
ledgerSchema.pre("updateOne", preventLegderModification)
ledgerSchema.pre("deleteOne", preventLegderModification)
ledgerSchema.pre("updateMany", preventLegderModification)
ledgerSchema.pre("deleteMany", preventLegderModification)
ledgerSchema.pre("findByIdAndUpdate", preventLegderModification)
ledgerSchema.pre("findByIdAndDelete", preventLegderModification)
ledgerSchema.pre("findOneAndRemove", preventLegderModification)


const ledgerModel = mongoose.model("ledger", ledgerSchema)

module.exports = ledgerModel