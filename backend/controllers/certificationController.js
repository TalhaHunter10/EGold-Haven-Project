const CertificationRequest = require("../models/certificationModel");
const Notification = require("../models/notificationModel");
const Jeweler = require("../models/jewelerModel");

const createCertificationRequest = async (req, res) => {
  try {
    const { listingid, buyerid, sellerid, jewelerid } = req.body;

    const existingRequest = await CertificationRequest.findOne({
      listingId: listingid,
      buyerId: buyerid,
      sellerId: sellerid,
      jewelerId: jewelerid,
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Certification request already exists",
      });
    }

    const certificationRequest = new CertificationRequest({
      listingId: listingid,
      buyerId: buyerid,
      sellerId: sellerid,
      jewelerId: jewelerid,
    });
    await certificationRequest.save();

    const notificationData = {
      notification: "You have a new certification request!",
      status: "unread",
      receivertype: "user",
      notificationtype: "certification",
      receiver: [sellerid],
    };

    await Notification.create(notificationData);

    res.status(200).json({
      message: "Certification request created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const myRequests = await CertificationRequest.find({
      buyerId: req.user._id,
    })
      .populate("listingId")
      .populate("sellerId")
      .populate("jewelerId");

    res.status(200).json(myRequests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecievedRequests = async (req, res) => {
  try {
    const recievedRequests = await CertificationRequest.find({
      sellerId: req.user._id,
    })
      .populate("listingId")
      .populate("buyerId")
      .populate("jewelerId");

    res.status(200).json(recievedRequests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await CertificationRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.sellerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    request.sellerStatus = "accepted";

    request.sellerAcceptTime = Date.now();

    await request.save();

    const notificationData = {
      notification:
        "Your certification request has been accepted by the seller",
      status: "unread",
      receivertype: "user",
      notificationtype: "certification",
      receiver: [request.buyerId],
    };

    await Notification.create(notificationData);

    res.status(200).json({
      message: "Request accepted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await CertificationRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.sellerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    request.sellerStatus = "rejected";

    await request.save();

    const notificationData = {
      notification:
        "Your certification request has been rejected by the seller",
      status: "unread",
      receivertype: "user",
      notificationtype: "certification",
      receiver: [request.buyerId],
    };

    await Notification.create(notificationData);

    res.status(200).json({
      message: "Request rejected successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRequestCount = async (req, res) => {
  try {
    const jeweler = await Jeweler.findOne({ user: req.user._id });

    if (!jeweler) {
      return res.status(404).json({
        message: "Jeweler not found",
      });
    }

    const requestCount = await CertificationRequest.countDocuments({
      jewelerId: jeweler._id,
      sellerStatus: "accepted",
    });

    res.status(200).json({
      requestCount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getJewelerRequests = async (req, res) => {
  try {
    const jeweler = await Jeweler.findOne({ user: req.user._id });

    if (!jeweler) {
      return res.status(404).json({
        message: "Jeweler not found",
      });
    }

    const jewelerRequests = await CertificationRequest.find({
      jewelerId: jeweler._id,
    })
      .populate("listingId")
      .populate("sellerId")
      .populate("buyerId");

    res.status(200).json(jewelerRequests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const acceptRequestAsJeweler = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await CertificationRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.jewelerStatus = "accepted";

    request.jewelerAcceptTime = Date.now();

    request.requestStatus = "inprogress";

    await request.save();

    const notificationData = {
      notification:
        "Your certification request has been accepted by the jeweler",
      status: "unread",
      receivertype: "user",
      notificationtype: "certification",
      receiver: [request.buyerId],
    };

    await Notification.create(notificationData);

    const notificationData2 = {
      notification:
        "Your certification request has been accepted by the jeweler",
      status: "unread",
      receivertype: "user",
      notificationtype: "certification",
      receiver: [request.sellerId],
    };

    await Notification.create(notificationData2);

    res.status(200).json({
      message: "Request accepted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const rejectRequestAsJeweler = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await CertificationRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.jewelerStatus = "rejected";
    request.requestStatus = "cancelled";

    await request.save();

    const notificationData = {
      notification:
        "Your certification request has been rejected by the jeweler",
      status: "unread",
      receivertype: "user",
      notificationtype: "certification",
      receiver: [request.buyerId],
    };

    await Notification.create(notificationData);

    const notificationData2 = {
      notification:
        "Your certification request has been rejected by the jeweler",
      status: "unread",
      receivertype: "user",
      notificationtype: "certification",
      receiver: [request.sellerId],
    };

    await Notification.create(notificationData2);

    res.status(200).json({
      message: "Request rejected successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const receiveBuyerCommission = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await CertificationRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.buyerPaymentStatus = "paid";

    const notificationData = {
      notification: "Your commission has been received",
      status: "unread",
      receivertype: "user",
      notificationtype: "certification",
      receiver: [request.buyerId],
    };

    await Notification.create(notificationData);

    await request.save();

    res.status(200).json({
      message: "Commission received successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const receiveSellerJewelry = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await CertificationRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.jewelryReceivedStatus = "received";

    const notificationData = {
      notification: "Your jewelry has been received",
      status: "unread",
      receivertype: "user",
      notificationtype: "certification",
      receiver: [request.sellerId],
    };

    await Notification.create(notificationData);

    await request.save();

    res.status(200).json({
      message: "Commission received successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addReport = async (req, res) => {
  try {
    const { requestId, report } = req.body;

    const request = await Certification.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.certificationReport = report;
    request.reportSubmissionTime = Date.now();
    request.requestStatus = "completed";

    await request.save();

    const notificationData = {
      notification: "Your certification report has been submitted",
      status: "unread",
      receivertype: "user",
      notificationtype: "certification",
      receiver: [request.buyerId],
    };

    await Notification.create(notificationData);

    const notificationData2 = {
      notification: "Your certification report has been submitted",
      status: "unread",
      receivertype: "user",
      notificationtype: "certification",
      receiver: [request.sellerId],
    };

    await Notification.create(notificationData2);

    res.status(200).json({
      message: "Report added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
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
};
