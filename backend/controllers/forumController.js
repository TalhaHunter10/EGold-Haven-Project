const Forum = require("../models/forumModel");
const User = require("../models/userModel");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const post = new Forum.ForumPost({
      title,
      content,
      user: req.user._id,
      userstatus: user.status,
    });
    await post.save();
    res.status(200).json({
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPosts = async (req, res) => {
  let query = {};

  const { search } = req.query;

  if (search) {
    // Trim the search query to remove any leading or trailing spaces
    const trimmedSearch = search.trim();

    // Split the trimmed search query into individual words
    const searchWords = trimmedSearch.split(/\s+/);

    // Construct an array of regex conditions for each word
    const orConditions = searchWords.map((word) => ({
      $or: [
        { title: { $regex: word, $options: "i" } },
        { content: { $regex: word, $options: "i" } },
      ],
    }));

    // Combine the conditions using logical OR
    query.$or = orConditions;
  }

  try {
    const posts = await Forum.ForumPost.find(query)
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyPosts = async (req, res) => {
  let query = { user: req.user._id };

  const { search } = req.query;

  if (search) {
    const trimmedSearch = search.trim();
    const searchWords = trimmedSearch.split(/\s+/);
    const orConditions = searchWords.map((word) => ({
      $or: [
        { title: { $regex: word, $options: "i" } },
        { content: { $regex: word, $options: "i" } },
      ],
    }));
    query.$or = orConditions;
  }

  try {
    const posts = await Forum.ForumPost.find(query)
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPostDetails = async (req, res) => {
  try {
    const post = await Forum.ForumPost.findById(req.params.id).populate(
      "user",
      "name"
    );
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    const replies = await Forum.ForumReply.find({ post: post._id }).populate(
      "user",
      "name"
    );

    res.status(200).json({
      post,
      replies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createReply = async (req, res) => {
  try {
    const { postId, reply } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const post = await Forum.ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    const reply1 = new Forum.ForumReply({
      content: reply,
      user: req.user._id,
      userstatus: user.status,
      post: postId,
    });

    await reply1.save();
    post.replies.push(reply._id);
    await post.save();
    res.status(200).json({
      reply,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  getMyPosts,
  getPostDetails,
  createReply,
};
