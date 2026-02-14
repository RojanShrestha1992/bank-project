const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User is required for creating an account"]
    },
    status:{
        enum: {
            values: ["ACTIVE","FROZEN", "CLOSED" ],
            message: "Status must be either ACTIVE, FROZEN, or CLOSED"
        }
    },
    currency:{
        type: String,
        required: [true, "Currency is required for creating an account"],
        default: "USD",
        match: [/^[A-Z]{3}$/, "Currency must be a valid ISO 4217 code (3 uppercase letters)"]
    }
},{
    timestamps: true
})



const accountModel = mongoose.model("account", accountSchema)

module.exports = accountModel