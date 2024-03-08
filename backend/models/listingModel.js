const mongoose = require("mongoose")
const geocoder = require('../utils/geocoder')

const listingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
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
    stones: {
        type: String,
        required: [true,"Please add stone details !"]
    },
    stonetypes: {
        type: String,
        default: ''
    },
    images:{
        type:Object,
        required: [true,"Please add images !"]
    },
    address:{
        type: String,
        required: [true,"Please add an address !"]
    },
    location:{
        type:{
            type:String,
            enum: ['Point']
        },
        coordinates:{
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String   
    },
    createdAt: {
        type: Date,
        default:Date.now
    }

},{
    timestamps: true
})

//Geocode and creating location

listingSchema.pre('save', async function(next){
    const loc = await geocoder.geocode({
        address: this.address,
    });
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }
    next();
});


const Listing = mongoose.model("Listing", listingSchema)

module.exports = Listing