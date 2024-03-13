const asyncHandler = require("express-async-handler");
const Listing = require("../models/listingModel");
const User = require("../models/userModel");

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
        res.status(500).json({ message: 'Server Error' });
      }
});

module.exports = {
    createListing,
    getLiveListings,
    getListingsById

}