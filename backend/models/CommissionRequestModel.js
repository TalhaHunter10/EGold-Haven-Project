const mongoose = require("mongoose")

const CommissionRequestSchema = mongoose.Schema({
    jeweler: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Jeweler"
    },
    reason: {
        type: String,
        required: [true,"Please add reasoning for your request !"],
        trim:true
    },
    response: {
        type: String,
        trim:true
    },
    newcommission: {
        type: String,
        required: [true,"Please add a new commission rate !"]
    },
    status: {
        type: String,
        required: [true, "Status could not be set"],
    },
},{
    timestamps: true
})

const CommissionRequest = mongoose.model("CommissionRequest", CommissionRequestSchema)

module.exports = CommissionRequest