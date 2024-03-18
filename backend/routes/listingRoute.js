const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { createListing, getLiveListings, getListingsById, getSimilarListings, likeListing, unlikeListing, getLikedStatus, getFavoritelistings, getUserListings } = require("../controllers/listingController");
const { upload } = require("../utils/fileUpload")

const router =  express.Router();

router.post('/createlisting',protect,upload.array('images', 8), createListing)
router.get('/getlivelistings', getLiveListings)
router.get('/getsimilarlistings', getSimilarListings)
router.get('/getfavoritelistings',protect, getFavoritelistings)
router.get('/getlistingsbyid/:id', getListingsById)
router.post('/likelisting',protect, likeListing)
router.post('/unlikelisting',protect, unlikeListing)
router.get('/getlikedstatus',protect, getLikedStatus)
router.get('/getuserlistings',protect, getUserListings)


module.exports = router