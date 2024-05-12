const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { upload } = require("../utils/fileUpload");
const { registerJeweler, getJewelerDetails, getCoverImagebyUrl, editJewelerDetails, getJewelerInformation, getUserJeweler, commissionChangeRequest, commissionRequestStatus, getJewelers } = require("../controllers/jewelerController");

const router =  express.Router();

const Uploads = upload.fields([{name: 'coverimage', maxCount: 1}, {name: 'cnicimages', maxCount: 2}, {name: 'storeimages', maxCount: 4}])

router.post('/registerjeweler',protect,Uploads, registerJeweler)
router.get('/getjewelerdetails',protect, getJewelerDetails)
router.get('/getcoverimagebyurl', getCoverImagebyUrl)
router.patch('/updatejeweler',protect,Uploads, editJewelerDetails)
router.get('/getjewelerinfo/:id', getJewelerInformation)
router.get('/getuserjeweler/:id', getUserJeweler)
router.post('/commissionchangerequest',protect, commissionChangeRequest)
router.get('/commissionchangerequeststatus',protect, commissionRequestStatus)
router.get('/getjewelers', getJewelers)

module.exports = router