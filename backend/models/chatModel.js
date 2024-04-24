const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    chattype: { type: String, trim: true },
    seen: {
        receiver: { type: mongoose.Schema.Types.ObjectId },
        status : { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;