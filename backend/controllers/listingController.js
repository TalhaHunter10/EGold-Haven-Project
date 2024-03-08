const asyncHandler = require("express-async-handler");
const Listing = require("../models/listingModel");

const createListing = asyncHandler(async (req, res) => {
    const { title, price, description, status, category, karats, weight, stones, stonetypes, address } = req.body;

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
        stonetypes,
        images,
        address,
    })

    res.status(201).json(listing);

});

module.exports = {
    createListing,
}