const mongoose = require("mongoose")
const geocoder = require('../utils/geocoder')

const jewelerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    cnicno: {
        type: String,
        required: [true,"Please add Cnic No. !"],
    },
    cnicimages:{
        type:Object,
        required: [true,"Please add Cnic images !"]
    },
    phoneno: {
        type: String,
        required: [true,"Please add some description !"]
    },
    coverimage:{
        type:Object,
        required: [true,"Please add Cover image !"]
    },
    storeimages:{
        type:Object,
        required: [true,"Please add Store images !"]
    },
    storename: {
        type: String,
        required: [true,"Please enter Store Name !"]
    },
    commissionrate:{
        type: String,
        required: [true,"Please enter Commision Rate !"]
    },
    shopno: {
            type: String,
            required: [true,"Please enter shop / store No. !"]
    },
    address:{
        type: String,
        required: [true,"Please add an address !"]
    },
    city:{
        type: String,
        required: [true,"Please select City !"]
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

jewelerSchema.pre('save', async function(next){
    const loc = await geocoder.geocode({
        address: this.city,
    });
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }
    next();
});


const Jeweler = mongoose.model("Jeweler", jewelerSchema)

module.exports = Jeweler