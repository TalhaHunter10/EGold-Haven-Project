const express = require("express");
const protect = require("../middlewares/authmiddleware");
const {
  getUserNotifications,
  readNotification,
} = require("../controllers/notificationController");

const router = express.Router();

router.get("/getusernotifications", protect, getUserNotifications);
router.put("/readnotification", protect, readNotification);

module.exports = router;
