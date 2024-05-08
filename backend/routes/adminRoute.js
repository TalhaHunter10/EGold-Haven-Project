const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { getStats, getJewelerRequests, acceptJeweler, rejectJeweler, acceptListing, rejectListing, getListingRequests, getUserDetailsForListingRequest, getProductRequests, getJewelerDetailsForProductRequest, acceptProduct, rejectProduct, getCommissionChangeRequests, acceptCommissionChangeRequest, rejectCommissionChangeRequest } = require("../controllers/adminController");

const router =  express.Router();



router.get('/getstats',protect, getStats)


router.get('/getjewelerrequests',protect, getJewelerRequests)
router.patch('/acceptjeweler/:userId',protect, acceptJeweler)
router.delete('/rejectjeweler/:jewelerId/:userId',protect, rejectJeweler)


router.get('/getlistingrequests',protect, getListingRequests)
router.patch('/acceptlisting/:listingId',protect, acceptListing)
router.patch('/rejectlisting/:listingId',protect, rejectListing)
router.get('/getuserdetailsforlistingrequest/:userId',protect, getUserDetailsForListingRequest)

router.get('/getproductrequests',protect, getProductRequests)
router.get('/getjewelerdetailsforproductrequest/:jewelerId',protect, getJewelerDetailsForProductRequest)
router.patch('/acceptproduct/:productId',protect, acceptProduct)
router.patch('/rejectproduct/:productId',protect, rejectProduct)


router.get('/getcommissionchangerequests',protect, getCommissionChangeRequests)
router.patch('/acceptcommissionchangerequest',protect, acceptCommissionChangeRequest)
router.patch('/rejectcommissionchangerequest',protect, rejectCommissionChangeRequest)


module.exports = router