const asyncHandler = require("express-async-handler");
const Jeweler = require("../models/jewelerModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const fetch = require('node-fetch');

const registerJeweler = asyncHandler(async (req, res) => {
    const { cnicno, address, phoneno, storename, commissionrate, shopno, city } = req.body;

    if (!cnicno || !phoneno || !storename  || !commissionrate || !shopno || !address || !city) {
        res.status(400)
        throw new Error("Please fill in all fields !")
    }

    const J = await Jeweler.findOne({ user: req.user.id });

    if (J) {
        res.status(400)
        throw new Error("Jeweler already registered")
    }

    const status = 'requested';

    //Manage Image Upload
    let fileDatacover = [];
    let fileDatacnic = [];
    let fileDatastore = [];
    if (req.files) {
        if (req.files.coverimage) {
            for (let i = 0; i < req.files['coverimage'].length; i++) {
                const uploadedFile = req.files['coverimage'][i];
                const fileInfo = {
                    fileName: uploadedFile.originalname,
                    filePath: uploadedFile.path,
                    fileType: uploadedFile.mimetype,
                    fileSize: uploadedFile.size,
                };
                fileDatacover.push(fileInfo);
            }
        }
        if (req.files.cnicimages) {
            for (let i = 0; i < req.files['cnicimages'].length; i++) {
                const uploadedFile = req.files['cnicimages'][i];
                const fileInfo = {
                    fileName: uploadedFile.originalname,
                    filePath: uploadedFile.path,
                    fileType: uploadedFile.mimetype,
                    fileSize: uploadedFile.size,
                };
                fileDatacnic.push(fileInfo);
            }
        }
        if (req.files.storeimages) {
            for (let i = 0; i < req.files['storeimages'].length; i++) {
                const uploadedFile = req.files['storeimages'][i];
                const fileInfo = {
                    fileName: uploadedFile.originalname,
                    filePath: uploadedFile.path,
                    fileType: uploadedFile.mimetype,
                    fileSize: uploadedFile.size,
                };
                fileDatastore.push(fileInfo);
            }
        }
    }
    const coverimage = fileDatacover, cnicimages = fileDatacnic, storeimages = fileDatastore;

    const jeweler = await Jeweler.create({
        user: req.user.id,
        cnicno,
        phoneno,
        storename,
        commissionrate,
        shopno,
        city,
        cnicimages,
        coverimage,
        storeimages,
        address,
    })

    if(jeweler){
        await User.findByIdAndUpdate(req.user.id, { status });
    }

    res.status(201).json(jeweler);

});

const getJewelerDetails = asyncHandler(async (req, res) => {

    const jeweler = await Jeweler.findOne({ user: req.user.id });

    if (!jeweler) {
        res.status(404);
        throw new Error('Jeweler not found');
    }

    res.status(200).json(jeweler);
});

const getCoverImagebyUrl = asyncHandler(async (req, res) => {
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

const editJewelerDetails = asyncHandler(async (req, res) => {

    const jeweler = await Jeweler.findOne({ user: req.user.id });

    if (!jeweler) {
        res.status(404);
        throw new Error('Jeweler not found');
    }

     //Manage Image Upload
     let fileDatacover = [];
    
        if (req.files.coverimage) {
            for (let i = 0; i < req.files['coverimage'].length; i++) {
                const uploadedFile = req.files['coverimage'][i];
                const fileInfo = {
                    fileName: uploadedFile.originalname,
                    filePath: uploadedFile.path,
                    fileType: uploadedFile.mimetype,
                    fileSize: uploadedFile.size,
                };
                fileDatacover.push(fileInfo);
            }
        }
     
     const images = fileDatacover;
 
     if (images.length === 0) {
         res.status(500);
         throw new Error('Something wrong with image upload')
     }

     const { address, phoneno, shopno } = jeweler;
     jeweler.address = req.body.address || address;
        jeweler.phoneno = req.body.phoneno || phoneno;
        jeweler.shopno = req.body.shopno || shopno;
        jeweler.images = images || jeweler.images;
        jeweler.save();

    res.status(200).json(jeweler);

});

const getJewelerInformation = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const jeweler = await Jeweler.findById(id);
    
    if (!jeweler) {
        res.status(404);
        throw new Error('Jeweler not found');
    }

    res.status(200).json(jeweler);
});


module.exports = {
    registerJeweler,
    getJewelerDetails,
    getCoverImagebyUrl,
    editJewelerDetails,
    getJewelerInformation
}