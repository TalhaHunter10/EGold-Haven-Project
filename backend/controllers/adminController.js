const asyncHandler = require("express-async-handler");
const Listing = require("../models/listingModel");
const User = require("../models/userModel");
const Jeweler = require("../models/jewelerModel");
const { response } = require("express");

const getStats = asyncHandler(async (req, res) => {

    const [registeredUsersCount, registeredJewelersCount, pendingJewelerRequestsCount, liveListingsCount, soldListingsCount, expiredListingsCount, rejectedListingsCount, pendingApprovalCount] = await Promise.all([
        User.countDocuments({ status: 'user' }),
        User.countDocuments({ status: 'jeweler' }),
        User.countDocuments({ status: 'requested' }),
        Listing.countDocuments({status: 'live'}),
        Listing.countDocuments({status: 'sold'}),
        Listing.countDocuments({status: 'expired'}),
        Listing.countDocuments({status: 'rejected'}),
        Listing.countDocuments({status: 'pending approval'}),
    ]);

    res.status(200).json({
        registeredUsers: registeredUsersCount,
        registeredJewelers: registeredJewelersCount,
        jewelerRequests: pendingJewelerRequestsCount,
        liveListings: liveListingsCount,
        soldListings: soldListingsCount,
        expiredListings: expiredListingsCount,
        rejectedListings: rejectedListingsCount,
        pendingApproval: pendingApprovalCount
    });
});

module.exports = {
    getStats,
}

