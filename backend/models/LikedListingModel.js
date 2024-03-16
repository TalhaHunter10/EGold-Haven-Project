const mongoose = require("mongoose")

const LikedListingsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Listing'
    }
});

const LikedListing = mongoose.model("LikedListing", LikedListingsSchema)

module.exports = LikedListing