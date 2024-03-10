const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { getStats } = require("../controllers/adminController")

const router =  express.Router();



router.get('/getstats',protect, getStats)


module.exports = router