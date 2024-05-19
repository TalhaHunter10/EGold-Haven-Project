const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    notification: { type: String, required: true },
    status: { type: String, required: true },
    receivertype: { type: String, required: true },
    notificationtype: { type: String, required: true },
    receiver: [{ type: Schema.Types.ObjectId, required: true }],
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
