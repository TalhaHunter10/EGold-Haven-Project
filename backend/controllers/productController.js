const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Jeweler = require("../models/jewelerModel");
const fetch = require('node-fetch');

const createProduct = asyncHandler(async (req, res) => {
    const { title, price, description, status, category, karats, weight } = req.body;

    if (!title || !price || !description || !status || !category || !karats || !weight) {
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

    if (images.length === 0) {
        res.status(500);
        throw new Error('Something wrong with image upload')
    }

    const grams = (weight * 11.66).toString();

    const jeweler = await Jeweler.findOne({ user: req.user.id });

    const product = await Product.create({
        jeweler: jeweler._id,
        title,
        price,
        description,
        status,
        category,
        karats,
        weights: { tola: weight, gram: grams },
        images,
    })

    res.status(201).json(product);

});

const getLiveProducts = asyncHandler(async (req, res) => {
    const liveProducts = await Product.find({ status: 'live' }).sort({ createdAt: -1 });
    const jewelerIds = liveProducts.map(product => product.jeweler);
    const jewelers = await Jeweler.find({ _id: { $in: jewelerIds } });

    const productsWithJewelerNames = liveProducts.map(product => {
        const jeweler = jewelers.find(jeweler => jeweler._id.equals(product.jeweler));
        const jewelerName = jeweler ? jeweler.storename : 'Unknown';
        return { ...product.toObject(), jewelerName };
    });
    
    res.status(200).json({liveProducts : productsWithJewelerNames});
});

const getSimilarProducts = asyncHandler(async (req, res) => {
    
        const { category } = req.query;
        const { excludeId } = req.query;
    
        const similarProducts = await Product.find({ category: category, _id: { $ne: excludeId } }).sort({ createdAt: -1 });

        res.status(200).json(similarProducts);
    }
);

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        const jewelerId = product.jeweler;

        const jeweler = await Jeweler.findById(jewelerId)

       

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ product, jeweler });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
);

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        await product.deleteOne({ _id: id });

        res.status(200).json({ message: 'Product Deleted Successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const editProduct = asyncHandler(async (req, res) => {
    const { ProductID } = req.body;

    

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

    if (images.length === 0) {
        res.status(500);
        throw new Error('Something wrong with image upload')
    }

    const grams = (req.body.weight * 11.66).toString();

    const product = await Product.findById(ProductID);
    if(product){
        const { title, price, description, category, karats, weight, stones, address } = product;
        product.title = req.body.title || title;
        product.price = req.body.price || price;
        product.description = req.body.description || description;
        product.category = req.body.category || category;
        product.karats = req.body.karats || karats;
        product.weights = { tola: req.body.weight || weight.tola, gram: grams || weight.gram };
        product.stones = req.body.stones || stones;
        product.images = images || product.images;
        product.address = req.body.address || address;
        product.status = 'pending approval';
        product.updatedAt = Date.now();
        await product.save();
    }
    res.status(200).json(product);
});

const getJewelerProducts = asyncHandler(async (req, res) => {

    const jeweler = await Jeweler.findOne({ user: req.user.id });

    const jewelerProducts = await Product.find({jeweler: jeweler._id}).sort({ createdAt: -1});
    res.status(200).json(jewelerProducts);

});


const downloadImageFromURL = asyncHandler(async (req, res) => {
    try {

        const { imageUrl } = req.query;

        // Fetch the image data from the URL
        const response = await fetch(imageUrl);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const imageBlob = await response.buffer();

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBlob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const getJewelerProductsInformation = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const products = await Product.find({ jeweler: id , status: 'live' }).sort({ createdAt: -1 });

    res.status(200).json({products : products});

});


const geocoder = require('../utils/geocoder')

function calculateDistance(coord1, coord2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(coord2.latitude - coord1.latitude);
    const dLon = deg2rad(coord2.longitude - coord1.longitude);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(coord1.latitude)) * Math.cos(deg2rad(coord2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

// Function to convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

const getProducts = asyncHandler(async (req, res) => {

    try {
        let query = { status: 'live' }; // Start with status: 'live' in the query

        const { search , category, location, karats, weight } = req.query;
        if (search) {
            // Trim the search query to remove any leading or trailing spaces
            const trimmedSearch = search.trim();
        
            // Split the trimmed search query into individual words
            const searchWords = trimmedSearch.split(/\s+/);
        
            // Construct an array of regex conditions for each word
            const orConditions = searchWords.map(word => ({
                $or: [
                    { title: { $regex: word, $options: 'i' } },
                    { description: { $regex: word, $options: 'i' } }
                ]
            }));
        
            // Combine the conditions using logical OR
            query.$or = orConditions;
        }

        if (category) {
            query.category = category;
        }

        if (karats) {
            query.karats = karats;
        }

        if (weight) {
            if (weight === "10+") {
                // For weight greater than 10 tola
                query["weights.tola"] = { $gt: 10 };
            } else {
                // For other weight ranges
                const [min, max] = weight.split("-").map(Number);
                query["weights.tola"] = { $gte: min, $lte: max };
            }
        }

        const products = await Product.find(query).sort({ createdAt: -1 });

        if (location) {
            // Geocode user's location
            const userCoords = await geocoder.geocode(location);
            const userCoordinates = {
                latitude: userCoords[0].latitude,
                longitude: userCoords[0].longitude
            };

            // Fetch jeweler details for each product
            for (const product of products) {
                const jeweler = await Jeweler.findById(product.jeweler);
                const jewelerCoords = jeweler.location.coordinates;
                const jewelerCoordinates = {
                    latitude: jewelerCoords[1],
                    longitude: jewelerCoords[0]
                };
                product.distance = calculateDistance(userCoordinates, jewelerCoordinates);
            }

            // Filter products within a certain radius (e.g., 100 km)
            const maxDistance = 100; // in kilometers
            const filteredProducts = products.filter(product => product.distance <= maxDistance);

            // Sort filtered products by distance
            filteredProducts.sort((a, b) => a.distance - b.distance);

            // Return the filtered and sorted products to the client
            res.status(200).json(filteredProducts);
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});

module.exports = { 
    createProduct,
    getLiveProducts,
    getSimilarProducts,
    getProductById,
    deleteProduct,
    editProduct,
    getJewelerProducts,
    downloadImageFromURL,
    getJewelerProductsInformation,
    getProducts
 };