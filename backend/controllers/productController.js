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




module.exports = { 
    createProduct,
    getLiveProducts,
    getSimilarProducts,
    getProductById,
    deleteProduct,
    editProduct,
    getJewelerProducts,
    downloadImageFromURL
 };