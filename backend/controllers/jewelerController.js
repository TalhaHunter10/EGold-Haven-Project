const asyncHandler = require("express-async-handler");
const Jeweler = require("../models/jewelerModel");
const User = require("../models/userModel");

const registerJeweler = asyncHandler(async (req, res) => {
    const { cnicno, address, phoneno, storename, commissionrate, shopno, city } = req.body;

    if (!cnicno || !phoneno || !storename  || !commissionrate || !shopno || !address || !city) {
        res.status(400)
        throw new Error("Please fill in all fields !")
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

module.exports = {
    registerJeweler,
}