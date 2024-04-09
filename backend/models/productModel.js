const mongoose = require("mongoose")
const geocoder = require('../utils/geocoder')

const productSchema = mongoose.Schema({
    jeweler: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Jeweler"
    },
    title: {
        type: String,
        required: [true,"Please add a title !"],
        trim:true
    },
    price: {
        type: String,
        required: [true,"Please add a price. !"]
    },
    description: {
        type: String,
        required: [true,"Please add some description !"]
    },
    status: {
        type: String,
        required: [true, "Status could not be set"],
    },
    category: {
        type: String,
        required: [true,"Please add a category!"]
    },
    karats: {
        type: String,
        required: [true,"Please add gold purity (karats) !"]
    },
    weights: {
        tola:{
            type: String,
            required: [true,"Please add weight (tola) !"]
        },
        gram:{
            type: String,
        }
    },
    images:{
        type:Object,
        required: [true,"Please add images !"]
    },
    createdAt: {
        type: Date,
        default:Date.now
    }

},{
    timestamps: true
})



const Product = mongoose.model("Product", productSchema)

module.exports = Product