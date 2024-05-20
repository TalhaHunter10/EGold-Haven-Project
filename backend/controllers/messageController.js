const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name")
      .populate("chat");
    const chat = await Chat.findById(req.params.chatId);
    if (String(chat.seen.receiver) === String(req.user._id)) {
      chat.seen.receiver = null;
      chat.seen.status = true;
      chat.save();
      console.log("seen");
    }
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId, receiver } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name",
    });

    const chat = await Chat.findById(chatId);
    chat.seen.receiver = receiver;
    chat.seen.status = false;
    chat.save();

    res.status(200).json(message);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to send message");
  }
});

module.exports = { allMessages, sendMessage };
