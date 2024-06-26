const asyncHandler = require("express-async-handler");
const Jeweler = require("../models/jewelerModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const CommissionRequest = require("../models/CommissionRequestModel");
const fetch = require("node-fetch");
const Notification = require("../models/notificationModel");
const Chat = require("../models/chatModel");

const registerJeweler = asyncHandler(async (req, res) => {
  const { cnicno, address, phoneno, storename, commissionrate, shopno, city } =
    req.body;

  if (
    !cnicno ||
    !phoneno ||
    !storename ||
    !commissionrate ||
    !shopno ||
    !address ||
    !city
  ) {
    res.status(400);
    throw new Error("Please fill in all fields !");
  }

  const J = await Jeweler.findOne({ user: req.user.id });

  if (J) {
    res.status(400);
    throw new Error("Jeweler already registered");
  }

  const status = "requested";

  //Manage Image Upload
  let fileDatacover = [];
  let fileDatacnic = [];
  let fileDatastore = [];
  if (req.files) {
    if (req.files.coverimage) {
      for (let i = 0; i < req.files["coverimage"].length; i++) {
        const uploadedFile = req.files["coverimage"][i];
        const fileInfo = {
          fileName: uploadedFile.originalname,
          filePath: uploadedFile.path,
          fileType: uploadedFile.mimetype,
          fileSize: uploadedFile.size,
        };
        fileDatacover.push(fileInfo);
      }
    }
    if (req.files.cnicimages) {
      for (let i = 0; i < req.files["cnicimages"].length; i++) {
        const uploadedFile = req.files["cnicimages"][i];
        const fileInfo = {
          fileName: uploadedFile.originalname,
          filePath: uploadedFile.path,
          fileType: uploadedFile.mimetype,
          fileSize: uploadedFile.size,
        };
        fileDatacnic.push(fileInfo);
      }
    }
    if (req.files.storeimages) {
      for (let i = 0; i < req.files["storeimages"].length; i++) {
        const uploadedFile = req.files["storeimages"][i];
        const fileInfo = {
          fileName: uploadedFile.originalname,
          filePath: uploadedFile.path,
          fileType: uploadedFile.mimetype,
          fileSize: uploadedFile.size,
        };
        fileDatastore.push(fileInfo);
      }
    }
  }
  const coverimage = fileDatacover,
    cnicimages = fileDatacnic,
    storeimages = fileDatastore;

  const jeweler = await Jeweler.create({
    user: req.user.id,
    cnicno,
    phoneno,
    storename,
    commissionrate,
    shopno,
    city,
    cnicimages,
    coverimage,
    storeimages,
    address,
  });

  if (jeweler) {
    await User.findByIdAndUpdate(req.user.id, { status });
  }

  const notificationData = {
    notification: "Your request for jeweler status is pending approval !",
    status: "unread",
    receivertype: "user",
    notificationtype: "null",
    receiver: [req.user.id],
  };

  await Notification.create(notificationData);

  res.status(201).json(jeweler);
});

const getJewelerDetails = asyncHandler(async (req, res) => {
  const jeweler = await Jeweler.findOne({ user: req.user.id });

  if (!jeweler) {
    res.status(404);
    throw new Error("Jeweler not found");
  }

  res.status(200).json(jeweler);
});

const getCoverImagebyUrl = asyncHandler(async (req, res) => {
  try {
    const { imageUrl } = req.query;

    // Fetch the image data from the URL
    const response = await fetch(imageUrl);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const imageBlob = await response.buffer();

    res.setHeader("Content-Type", "image/jpeg");
    res.send(imageBlob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const editJewelerDetails = asyncHandler(async (req, res) => {
  const jeweler = await Jeweler.findOne({ user: req.user.id });

  if (!jeweler) {
    res.status(404);
    throw new Error("Jeweler not found");
  }

  //Manage Image Upload
  let fileDatacover = [];

  if (req.files.coverimage) {
    for (let i = 0; i < req.files["coverimage"].length; i++) {
      const uploadedFile = req.files["coverimage"][i];
      const fileInfo = {
        fileName: uploadedFile.originalname,
        filePath: uploadedFile.path,
        fileType: uploadedFile.mimetype,
        fileSize: uploadedFile.size,
      };
      fileDatacover.push(fileInfo);
    }
  }

  const images = fileDatacover;

  if (images.length === 0) {
    res.status(500);
    throw new Error("Something wrong with image upload");
  }

  const { address, phoneno, shopno } = jeweler;
  jeweler.address = req.body.address || address;
  jeweler.phoneno = req.body.phoneno || phoneno;
  jeweler.shopno = req.body.shopno || shopno;
  jeweler.images = images || jeweler.images;
  jeweler.save();

  res.status(200).json(jeweler);
});

const getJewelerInformation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const jeweler = await Jeweler.findById(id);

  if (!jeweler) {
    res.status(404);
    throw new Error("Jeweler not found");
  }

  res.status(200).json(jeweler);
});

const getUserJeweler = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const jeweler = await Jeweler.findOne({ user: id });

  if (!jeweler) {
    res.status(404);
    throw new Error("Jeweler not found");
  }

  res.status(200).json(jeweler);
});

const commissionChangeRequest = asyncHandler(async (req, res) => {
  const { newcommission, reason } = req.body;

  const jeweler = await Jeweler.findOne({ user: req.user.id });

  const status = "pending";

  if (!jeweler) {
    res.status(404);
    throw new Error("Jeweler not found");
  }

  const request = await CommissionRequest.findOne({
    jeweler: jeweler._id,
    status: "pending",
  });

  if (request) {
    res.status(400);
    throw new Error("Request already pending approval !");
  }

  const request2 = await CommissionRequest.findOne({
    jeweler: jeweler._id,
    status: "approved",
  });

  if (
    request2 &&
    Date.now() - request2.createdAt.getTime() > 30 * 24 * 60 * 60 * 1000
  ) {
    await CommissionRequest.findByIdAndDelete(request2._id);
  } else if (request2) {
    res.status(400);
    throw new Error(
      "Your Request has already been approved. Wait for a month to request again !"
    );
  }

  const request3 = await CommissionRequest.findOne({
    jeweler: jeweler._id,
    status: "rejected",
  });

  if (
    request3 &&
    Date.now() - request3.createdAt.getTime() > 30 * 24 * 60 * 60 * 1000
  ) {
    await CommissionRequest.findByIdAndDelete(request3._id);
  } else if (request3) {
    res.status(400);
    throw new Error(
      "Your Request has been rejected .Wait for a month to request again !"
    );
  }

  const commissionrequest = await CommissionRequest.create({
    jeweler: jeweler._id,
    reason,
    newcommission,
    status,
  });

  const notificationData = {
    notification: "Your request for commission change is pending approval !",
    status: "unread",
    receivertype: "jeweler",
    notificationtype: "null",
    receiver: [req.user.id],
  };

  await Notification.create(notificationData);

  res.status(200).json(commissionrequest);
});

const commissionRequestStatus = asyncHandler(async (req, res) => {
  const id = req.user.id;

  const jeweler = await Jeweler.findOne({ user: id });

  const request = await CommissionRequest.findOne({ jeweler: jeweler._id });

  if (!request) {
    res.status(404);
    throw new Error("You have not requested for commission change yet");
  }

  if (request.status === "pending") {
    res.status(200).json({ message: "Your request is pending approval" });
  } else if (request.status === "approved") {
    res.status(200).json({ message: "Your request has been approved" });
  } else if (request.status === "rejected") {
    res.status(200).json({ message: "Your request has been rejected" });
  }

  res.status(200).json(request);
});

const getJewelers = asyncHandler(async (req, res) => {
  const users = await User.find({ status: "jeweler" });

  const { id } = req.query;

  if (!users) {
    res.status(404);
    throw new Error("No jewelers found");
  }
  let query;

  if (id) {
    query = {
      user: { $in: users.map((user) => user._id), $ne: id },
    };
  } else {
    query = {
      user: { $in: users.map((user) => user._id) },
    };
  }

  const { search, location } = req.query;

  if (search) {
    // Trim the search query to remove any leading or trailing spaces
    const trimmedSearch = search.trim();

    // Split the trimmed search query into individual words
    const searchWords = trimmedSearch.split(/\s+/);

    // Construct an array of regex conditions for each word
    const orConditions = searchWords.map((word) => ({
      $or: [
        { storename: { $regex: word, $options: "i" } },
        { address: { $regex: word, $options: "i" } },
        { shopno: { $regex: word, $options: "i" } },
      ],
    }));

    // Combine the conditions using logical OR
    query.$or = orConditions;
  }

  const jewelers = await Jeweler.find(query);

  if (!jewelers) {
    res.status(404);
    throw new Error("No jewelers found");
  }

  // Create a new array to store jewelers with numberOfProducts
  const jewelersWithProducts = [];

  // Iterate over jewelers and count the number of products for each jeweler
  for (const jeweler of jewelers) {
    const numberOfProducts = await Product.countDocuments({
      jeweler: jeweler._id,
    });
    const jewelerWithProducts = {
      ...jeweler.toObject(),
      numberOfProducts: numberOfProducts,
    };
    jewelersWithProducts.push(jewelerWithProducts);
  }

  if (location) {
    const jewelers2 = jewelersWithProducts.filter(
      (jeweler) => jeweler.city === location
    );

    res.status(200).json(jewelers2);
  }

  res.status(200).json(jewelersWithProducts);
});

const getJewelerChats = asyncHandler(async (req, res) => {
  const jeweler = await Jeweler.findOne({ user: req.user.id });

  if (!jeweler) {
    res.status(404);
    throw new Error("Jeweler not found");
  }

  const chats = await Chat.find({
    users: jeweler.user,
    chattype: "jeweler",
    "seen.receiver": jeweler.user,
    "seen.status": false,
  });

  res.status(200).json(chats);
});

module.exports = {
  registerJeweler,
  getJewelerDetails,
  getCoverImagebyUrl,
  editJewelerDetails,
  getJewelerInformation,
  getUserJeweler,
  commissionChangeRequest,
  commissionRequestStatus,
  getJewelers,
  getJewelerChats,
};
