const mongoose = require("mongoose");

const CertificationRequestSchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jewelerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jeweler",
      required: true,
    },
    certificationReport: { type: String, default: "" },
    sellerStatus: {
      type: String,
      default: "pending",
    },
    jewelerStatus: {
      type: String,
      default: "pending",
    },
    requestStatus: {
      type: String,
      enum: ["pending", "inprogress", "completed", "cancelled"],
      default: "pending",
    },
    sellerAcceptTime: { type: Date },
    jewelerAcceptTime: { type: Date },
    reportSubmissionTime: { type: Date },
    buyerPaymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    jewelryReceivedStatus: {
      type: String,
      enum: ["pending", "received"],
      default: "pending",
    },
    certificationStatus: {
      type: String,
      enum: ["pending", "valid", "invalid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const CertificationRequest = mongoose.model(
  "CertificationRequest",
  CertificationRequestSchema
);
module.exports = CertificationRequest;
