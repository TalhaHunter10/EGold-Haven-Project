const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { createListing, getLiveListings, getListingsById, getSimilarListings } = require("../controllers/listingController");
const { upload } = require("../utils/fileUpload")

const router =  express.Router();

router.post('/createlisting',protect,upload.array('images', 8), createListing)
router.get('/getlivelistings', getLiveListings)
router.get('/getsimilarlistings', getSimilarListings)
router.get('/getlistingsbyid/:id', getListingsById)


module.exports = router