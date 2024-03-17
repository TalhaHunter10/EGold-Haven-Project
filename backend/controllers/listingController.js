const asyncHandler = require("express-async-handler");
const Listing = require("../models/listingModel");
const User = require("../models/userModel");
const LikedListing = require("../models/LikedListingModel");

const createListing = asyncHandler(async (req, res) => {
    const { title, price, description, status, category, karats, weight, stones, address } = req.body;

    if (!title || !price || !description || !status || !category || !karats || !weight || !stones || !address) {
        res.status(400)
        throw new Error("Please fill in all fields !")
    }

    //Manage Image Upload
    let fileData = [];
    if (req.files && req.files.length > 0) {
        // Loop through each file in req.files array
        for (let i = 0; i < req.files.length; i++) {
            const uploadedFile = req.files[i];
            const fileInfo = {
                fileName: uploadedFile.originalname,
                filePath: uploadedFile.path,
                fileType: uploadedFile.mimetype,
                fileSize: uploadedFile.size,
            };
            // Push fileInfo object into fileData array
            fileData.push(fileInfo);
        }
    }
    const images = fileData;

    if(images.length === 0){
        res.status(500);
        throw new Error('Something wrong with image upload')
    }

    const grams = (weight * 11.66).toString();

    const listing = await Listing.create({
        user: req.user.id,
        title,
        price,
        description,
        status,
        category,
        karats,
        weights: { tola: weight, gram: grams },
        stones,
        images,
        address,
    })

    res.status(201).json(listing);

});

const getLiveListings = asyncHandler(async (req, res) => {
    const liveListings = await Listing.find({ status: 'pending approval' }).sort({ createdAt: -1 });
    res.status(200).json(liveListings);
});

const getSimilarListings = asyncHandler(async (req, res) => {

    const { category } = req.query;
    const { excludeId } = req.query;

    const similarListings = await Listing.find({ status: 'live', category: category, _id: { $ne: excludeId } } ).sort({ createdAt: -1 });
    res.status(200).json(similarListings);
});

const getListingsById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        const listings = await Listing.find({ _id: id });

        const sellerId = listings[0].user;

        const seller = await User.find({_id : sellerId})
    
        if (!listings) {
          return res.status(404).json({ message: 'Listings not found' });
        }
    
        res.status(200).json({listings , seller});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Listing not Found' });
      }
});

const getFavoritelistings = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const likedListings = await LikedListing.find({ userId });

    const listingIds = likedListings.map((listing) => listing.listingId);

    const favoriteListings = await Listing.find({ _id: { $in: listingIds }, status: 'pending approval'});

    res.status(200).json(favoriteListings);
});


// Controller function to handle liking a listing
 const likeListing = asyncHandler(async (req, res) => {
    const { listingId } = req.body;
    const userId = req.user.id;

    // Create a new like entry
    const newLike = new LikedListing({ userId, listingId });
    await newLike.save();

    res.status(201).json({ message: 'Listing liked successfully' });
});

// Controller function to handle unliking a listing
const unlikeListing = asyncHandler(async (req, res) => {
    const { listingId } = req.body;
    const userId = req.user.id;
    
    // Find and delete the like entry
    await LikedListing.findOneAndDelete({ userId, listingId });

    res.status(200).json({ message: 'Listing unliked successfully' });
});

const getLikedStatus = asyncHandler(async (req, res) => {
    const { listingId } = req.query;
    const userId = req.user.id;

    // Check if the user has liked the listing
    const like = await LikedListing.findOne({ userId, listingId });

    if (like) {
        res.status(200).json({ liked: true });
    }
    else {
        res.status(200).json({ liked: false });
    }
});


module.exports = {
    createListing,
    getLiveListings,
    getListingsById,
    getSimilarListings,
    likeListing,
    unlikeListing,
    getLikedStatus,
    getFavoritelistings
}