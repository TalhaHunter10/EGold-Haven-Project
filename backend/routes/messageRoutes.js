const express = require("express");

const { allMessages, sendMessage } = require("../controllers/messageController");
const protect = require("../middlewares/authmiddleware");

const router = express.Router();

router.get( "/:chatId",protect, allMessages);
router.post("/send" ,protect, sendMessage);

module.exports = router;