const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const Notification = require("../models/notificationModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId, chattype } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
    chattype: chattype,
  }).populate("users", "-password");

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "One to One Chat",
      users: [req.user._id, userId],
      chattype: chattype,
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      const notificationData = {
        notification: "You have a new chat!",
        status: "unread",
        receivertype: chattype,
        notificationtype: "chat",
        receiver: [userId],
      };

      await Notification.create(notificationData);

      const user = await User.findById(userId);

      const message = `
      <h2>Hello ${user.name}</h2>
      <p>You have a new chat message.</p>
      <p>Access chat by Logging into your EGold Haven Account now !!</p>

      <p>Regards...</p>
      <p>Egold Haven Team</p>
    `;

      const subject = "New Chat Message on your Egold Haven Account";
      const send_to = user.email;
      const sent_from = process.env.EMAIL_USER;

      try {
        await sendEmail(subject, message, send_to, sent_from);
      } catch (error) {
        console.error("Error sending email:", error);
      }

      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  accessChat,
  fetchChats,
};
