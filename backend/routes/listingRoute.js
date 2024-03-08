const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { createListing } = require("../controllers/listingController");
const { upload } = require("../utils/fileUpload")

const router =  express.Router();

router.post('/createlisting',protect,upload.array('images', 8), createListing)


module.exports = router