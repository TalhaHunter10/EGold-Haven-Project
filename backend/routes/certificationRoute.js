const express = require("express");
const protect = require("../middlewares/authmiddleware");
const {
  createCertificationRequest,
  getMyRequests,
  getRecievedRequests,
  acceptRequest,
  rejectRequest,
  getRequestCount,
  getJewelerRequests,
  acceptRequestAsJeweler,
  rejectRequestAsJeweler,
  receiveBuyerCommission,
  receiveSellerJewelry,
  addReport,
} = require("../controllers/certificationController");

const router = express.Router();

router.post("/createcertificationrequest", protect, createCertificationRequest);
router.get("/getmyrequests", protect, getMyRequests);
router.get("/getrecievedrequests", protect, getRecievedRequests);

router.post("/acceptrequest", protect, acceptRequest);
router.post("/rejectrequest", protect, rejectRequest);

router.get("/getrequestcount", protect, getRequestCount);

router.get("/getjewelerrequests", protect, getJewelerRequests);
router.post("/acceptrequestasjeweler", protect, acceptRequestAsJeweler);
router.post("/rejectrequestasjeweler", protect, rejectRequestAsJeweler);

router.post("/receivebuyercommission", protect, receiveBuyerCommission);
router.post("/receivesellerjewelry", protect, receiveSellerJewelry);

router.post("/addreport", protect, addReport);

module.exports = router;
