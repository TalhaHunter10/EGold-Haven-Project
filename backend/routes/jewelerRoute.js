const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { upload } = require("../utils/fileUpload");
const { registerJeweler, getJewelerDetails } = require("../controllers/jewelerController");

const router =  express.Router();

const Uploads = upload.fields([{name: 'coverimage', maxCount: 1}, {name: 'cnicimages', maxCount: 2}, {name: 'storeimages', maxCount: 4}])

router.post('/registerjeweler',protect,Uploads, registerJeweler)
router.get('/getjewelerdetails',protect, getJewelerDetails)


module.exports = router