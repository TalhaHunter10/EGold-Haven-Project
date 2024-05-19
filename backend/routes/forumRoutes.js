const express = require("express");
const protect = require("../middlewares/authmiddleware");
const {
  createPost,
  getPosts,
  getMyPosts,
  getPostDetails,
  createReply,
} = require("../controllers/forumController");

const router = express.Router();
router.post("/createpost", protect, createPost);
router.get("/getposts", getPosts);
router.get("/getmyposts", protect, getMyPosts);
router.get("/getpostdetails/:id", getPostDetails);
router.post("/createreply", protect, createReply);

module.exports = router;
