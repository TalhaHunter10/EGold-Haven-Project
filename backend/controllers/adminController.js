const asyncHandler = require("express-async-handler");
const Listing = require("../models/listingModel");
const User = require("../models/userModel");
const Jeweler = require("../models/jewelerModel");
const Product = require("../models/productModel");
const { response } = require("express");
const CommissionRequest = require("../models/CommissionRequestModel");

const getStats = asyncHandler(async (req, res) => {

    const [registeredUsersCount, registeredJewelersCount, pendingJewelerRequestsCount, liveListingsCount, soldListingsCount, expiredListingsCount, rejectedListingsCount, pendingApprovalCount , liveProducts, rejectedProducts , pendingProductsApproval] = await Promise.all([
        User.countDocuments({ status: 'user' }),
        User.countDocuments({ status: 'jeweler' }),
        User.countDocuments({ status: 'requested' }),
        Listing.countDocuments({status: 'live'}),
        Listing.countDocuments({status: 'sold'}),
        Listing.countDocuments({status: 'expired'}),
        Listing.countDocuments({status: 'rejected'}),
        Listing.countDocuments({status: 'pending approval'}),
        Product.countDocuments({status: 'live'}),
        Product.countDocuments({status: 'rejected'}),
        Product.countDocuments({status: 'pending approval'})
    ]);

    res.status(200).json({
        registeredUsers: registeredUsersCount,
        registeredJewelers: registeredJewelersCount,
        jewelerRequests: pendingJewelerRequestsCount,
        liveListings: liveListingsCount,
        soldListings: soldListingsCount,
        expiredListings: expiredListingsCount,
        rejectedListings: rejectedListingsCount,
        pendingApproval: pendingApprovalCount,
        liveProducts: liveProducts,
        rejectedProducts: rejectedProducts,
        pendingProductsApproval: pendingProductsApproval
    });
});

const getJewelerRequests = asyncHandler(async (req, res) => {

const jewelers = await Jeweler.find({ user: { $in: await User.find({ status: 'requested' }).distinct('_id') } });
res.status(200).json(jewelers);

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


const getProductRequests = asyncHandler(async (req, res) => {
    const products = await Product.find({status: 'pending approval'});

    res.status(200).json(products);
});


const acceptProduct = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const product = await Product.findById(productId);

    if(product){
        product.status = 'live';
        await product.save();
        res.status(200).json({message: 'Product Status Accepted Successfully !!!'});
    }
    else{
        res.status(404);
        throw new Error('Product not found');
    }
});

const rejectProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if(product){
        product.status = 'rejected';
        await product.save();
        res.status(200).json({message: 'Product Status Rejected Successfully !!!'});
    }
    else{
        res.status(404);
        throw new Error('Product not found');
    }
});


const getJewelerDetailsForProductRequest = asyncHandler(async (req, res) => {
    const { jewelerId } = req.params;

    const status = { $ne: "pending approval" };

    const jeweler = await Jeweler.findById(jewelerId);

    const Products = await Product.find({jeweler: jewelerId, status});
    if(jeweler){
        res.status(200).json({
            storename: jeweler.storename,
            shopno: jeweler.shopno,
            address: jeweler.address,
            city: jeweler.city,
            commissionrate: jeweler.commissionrate,
            image : jeweler.coverimage,
            phoneno : jeweler.phoneno,
            products: Products
        });
    }
    else{
        res.status(404);
        throw new Error('Jeweler not found');
    }
});

const getCommissionChangeRequests = asyncHandler(async (req, res) => {
    const commissionRequests = await CommissionRequest.find({status: 'pending'});

    res.status(200).json(commissionRequests);
});

const acceptCommissionChangeRequest = asyncHandler(async (req, res) => {
    const { requestId, reason } = req.body;

    const commissionRequest = await CommissionRequest.findById (requestId);

    if(commissionRequest){

        const jeweler = await Jeweler.findById(commissionRequest.jeweler);

        if(jeweler){
            jeweler.commissionrate = commissionRequest.newcommission;
            await jeweler.save();
            commissionRequest.status = 'approved';
            commissionRequest.response = reason;
            await commissionRequest.save();
            res.status(200).json({message: 'Commission Change Request Accepted Successfully !!!'});
        }
        else{
            res.status(404);
            throw new Error('Jeweler not found');
        }
    }
    else{
        res.status(404);
        throw new Error('Commission Request not found');
    }
});

const rejectCommissionChangeRequest = asyncHandler(async (req, res) => {
    const { requestId, reason } = req.body;

    const commissionRequest = await CommissionRequest.findById (requestId);

    if(commissionRequest){
        commissionRequest.status = 'rejected';
        commissionRequest.response = reason;
        await commissionRequest.save();
        res.status(200).json({message: 'Commission Change Request Rejected Successfully !!!'});
    }
    else{
        res.status(404);
        throw new Error('Commission Request not found');
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
    getUserDetailsForListingRequest,
    getProductRequests,
    acceptProduct,
    rejectProduct,
    getJewelerDetailsForProductRequest,
    getCommissionChangeRequests,
    acceptCommissionChangeRequest,
    rejectCommissionChangeRequest
    
}

