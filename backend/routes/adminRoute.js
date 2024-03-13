const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { getStats, getJewelerRequests } = require("../controllers/adminController")

const router =  express.Router();



router.get('/getstats',protect, getStats)
router.get('/getjewelerrequests',protect, getJewelerRequests)

module.exports = router