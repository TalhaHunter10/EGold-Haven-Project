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

const getJewelerRequests = asyncHandler(async (req, res) => {
    const allJewelers = await Jeweler.find();

    res.status(200).json(allJewelers);
});

const acceptJeweler = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if(user){
        user.status = 'jeweler';
        await user.save();
        res.status(200).json({message: 'Jeweler Status Accepted Successfully !!!'});
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
});

const rejectJeweler = asyncHandler(async (req, res) => {
    const { jewelerId, userId } = req.params;
    console.log(jewelerId, userId);
    const user = await User.findById(userId);

    if(user){
        user.status = 'user';
        await user.save();
        await Jeweler.findByIdAndDelete(jewelerId);
        res.status(200).json({message: 'Jeweler Status Request Rejected Successfully !!!'});
    }   
    else{
        res.status(404);
        throw new Error('User not found');
    }
});

const getListingRequests = asyncHandler(async (req, res) => {
    const listings = await Listing.find({status: 'pending approval'});

    res.status(200).json(listings);
});

const acceptListing = asyncHandler(async (req, res) => {

    const { listingId } = req.params;

    const listing = await Listing.findById(listingId);

    if(listing){
        listing.status = 'live';
        await listing.save();
        res.status(200).json({message: 'Listing Status Accepted Successfully !!!'});
    }
    else{
        res.status(404);
        throw new Error('Listing not found');
    }
});

const rejectListing = asyncHandler(async (req, res) => {
    const { listingId } = req.params;

    const listing = await Listing.findById(listingId);

    if(listing){
        listing.status = 'rejected';
        await listing.save();
        res.status(200).json({message: 'Listing Status Rejected Successfully !!!'});
    }
    else{
        res.status(404);
        throw new Error('Listing not found');
    }
});

const getUserDetailsForListingRequest = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const status = { $ne: "pending approval" };

    const user = await User.findById(userId);

    const Listings = await Listing.find({user: userId, status});
    if(user){
        res.status(200).json({
            name: user.name,
            email: user.email,
            listings: Listings
        });
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
});


module.exports = {
    getStats,
    getJewelerRequests,
    acceptJeweler,
    rejectJeweler,
    getListingRequests,
    acceptListing,
    rejectListing,
    getUserDetailsForListingRequest
}

