const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { getStats, getJewelerRequests, acceptJeweler, rejectJeweler, acceptListing, rejectListing, getListingRequests, getUserDetailsForListingRequest } = require("../controllers/adminController")

const router =  express.Router();



router.get('/getstats',protect, getStats)
router.get('/getjewelerrequests',protect, getJewelerRequests)
router.patch('/acceptjeweler/:userId',protect, acceptJeweler)
router.delete('/rejectjeweler/:jewelerId/:userId',protect, rejectJeweler)
router.get('/getlistingrequests',protect, getListingRequests)
router.patch('/acceptlisting/:listingId',protect, acceptListing)
router.patch('/rejectlisting/:listingId',protect, rejectListing)
router.get('/getuserdetailsforlistingrequest/:userId',protect, getUserDetailsForListingRequest)

module.exports = router