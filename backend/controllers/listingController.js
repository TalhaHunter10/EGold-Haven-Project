const asyncHandler = require("express-async-handler");
const Listing = require("../models/listingModel");
const User = require("../models/userModel");
const LikedListing = require("../models/LikedListingModel");
const fetch = require("node-fetch");

const createListing = asyncHandler(async (req, res) => {
  const {
    title,
    price,
    description,
    status,
    category,
    karats,
    weight,
    stones,
    address,
  } = req.body;

  if (
    !title ||
    !price ||
    !description ||
    !status ||
    !category ||
    !karats ||
    !weight ||
    !stones ||
    !address
  ) {
    res.status(400);
    throw new Error("Please fill in all fields !");
  }

  //Manage Image Upload
  let fileData = [];
  if (req.files && req.files.length > 0) {
    // Loop through each file in req.files array
    for (let i = 0; i < req.files.length; i++) {
      const uploadedFile = req.files[i];
      const fileInfo = {
        fileName: uploadedFile.originalname,
        filePath: uploadedFile.path,
        fileType: uploadedFile.mimetype,
        fileSize: uploadedFile.size,
      };
      // Push fileInfo object into fileData array
      fileData.push(fileInfo);
    }
  }
  const images = fileData;

  if (images.length === 0) {
    res.status(500);
    throw new Error("Something wrong with image upload");
  }

  const grams = (weight * 11.66).toString();

  const listing = await Listing.create({
    user: req.user.id,
    title,
    price,
    description,
    status,
    category,
    karats,
    weights: { tola: weight, gram: grams },
    stones,
    images,
    address,
  });

  const notificationData = {
    notification:
      "Your listing has been created successfully and is now pending approval !",
    status: "unread",
    receivertype: "user",
    notificationtype: "mylisting",
    receiver: req.user.id,
  };

  await Notification.create(notificationData);

  res.status(201).json(listing);
});

const getLiveListings = asyncHandler(async (req, res) => {
  const liveListings = await Listing.find({ status: "live" }).sort({
    createdAt: -1,
  });
  res.status(200).json(liveListings);
});

const getSimilarListings = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const { excludeId } = req.query;

  const similarListings = await Listing.find({
    status: "live",
    category: category,
    _id: { $ne: excludeId },
  }).sort({ createdAt: -1 });
  res.status(200).json(similarListings);
});

const getListingsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const listings = await Listing.find({ _id: id });

    const sellerId = listings[0].user;

    const seller = await User.find({ _id: sellerId });

    if (!listings) {
      return res.status(404).json({ message: "Listings not found" });
    }

    res.status(200).json({ listings, seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Listing not Found" });
  }
});

const deleteListing = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);

    if (!listing) {
      res.status(404);
      throw new Error("Listing not found");
    }

    await Listing.deleteOne({ _id: id });

    const notificationData = {
      notification: "Your listing has been deleted successfully !",
      status: "unread",
      receivertype: "user",
      notificationtype: "mylisting",
      receiver: listing.user,
    };

    await Notification.create(notificationData);

    res.status(200).json({ message: "Listing Deleted Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const getUserListings = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const userlistings = await Listing.find({ user: userId }).sort({
    createdAt: -1,
  });

  res.status(200).json(userlistings);
});

const getFavoritelistings = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const likedListings = await LikedListing.find({ userId });

  const listingIds = likedListings.map((listing) => listing.listingId);

  const favoriteListings = await Listing.find({
    _id: { $in: listingIds },
    status: "live",
  });

  res.status(200).json(favoriteListings);
});

// Controller function to handle liking a listing
const likeListing = asyncHandler(async (req, res) => {
  const { listingId } = req.body;
  const userId = req.user.id;

  // Create a new like entry
  const newLike = new LikedListing({ userId, listingId });
  await newLike.save();

  res.status(201).json({ message: "Listing liked successfully" });
});

// Controller function to handle unliking a listing
const unlikeListing = asyncHandler(async (req, res) => {
  const { listingId } = req.body;
  const userId = req.user.id;

  // Find and delete the like entry
  await LikedListing.findOneAndDelete({ userId, listingId });

  res.status(200).json({ message: "Listing unliked successfully" });
});

const getLikedStatus = asyncHandler(async (req, res) => {
  const { listingId } = req.query;
  const userId = req.user.id;

  // Check if the user has liked the listing
  const like = await LikedListing.findOne({ userId, listingId });

  if (like) {
    res.status(200).json({ liked: true });
  } else {
    res.status(200).json({ liked: false });
  }
});

const downloadImageFromURL = asyncHandler(async (req, res) => {
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

const editListing = asyncHandler(async (req, res) => {
  const { ListingID } = req.body;

  //Manage Image Upload
  let fileData = [];
  if (req.files && req.files.length > 0) {
    // Loop through each file in req.files array
    for (let i = 0; i < req.files.length; i++) {
      const uploadedFile = req.files[i];
      const fileInfo = {
        fileName: uploadedFile.originalname,
        filePath: uploadedFile.path,
        fileType: uploadedFile.mimetype,
        fileSize: uploadedFile.size,
      };
      // Push fileInfo object into fileData array
      fileData.push(fileInfo);
    }
  }
  const images = fileData;

  if (images.length === 0) {
    res.status(500);
    throw new Error("Something wrong with image upload");
  }

  const grams = (req.body.weight * 11.66).toString();

  const listing = await Listing.findById(ListingID);
  if (listing) {
    const {
      title,
      price,
      description,
      category,
      karats,
      weight,
      stones,
      address,
    } = listing;
    listing.title = req.body.title || title;
    listing.price = req.body.price || price;
    listing.description = req.body.description || description;
    listing.category = req.body.category || category;
    listing.karats = req.body.karats || karats;
    listing.weights = {
      tola: req.body.weight || weight.tola,
      gram: grams || weight.gram,
    };
    listing.stones = req.body.stones || stones;
    listing.images = images || listing.images;
    listing.address = req.body.address || address;
    listing.status = "pending approval";
    listing.updatedAt = Date.now();
    await listing.save();
  }
  res.status(200).json(listing);
});

const SetListingSold = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);

    if (!listing) {
      res.status(404);
      throw new Error("Listing not found");
    }

    listing.status = "sold";
    await listing.save();

    const notificationData = {
      notification: "Your listing has been marked sold successfully !",
      status: "unread",
      receivertype: "user",
      notificationtype: "mylisting",
      receiver: listing.user,
    };

    await Notification.create(notificationData);

    res.status(200).json({ message: "Listing Sold Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const geocoder = require("../utils/geocoder");
const Notification = require("../models/notificationModel");

function calculateDistance(coord1, coord2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(coord2.latitude - coord1.latitude);
  const dLon = deg2rad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude)) *
      Math.cos(deg2rad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

// Function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const getListings = asyncHandler(async (req, res) => {
  try {
    let query = { status: "live" }; // Start with status: 'live' in the query

    const { search, category, location, karats, stones, weight } = req.query;
    if (search) {
      // Trim the search query to remove any leading or trailing spaces
      const trimmedSearch = search.trim();

      // Split the trimmed search query into individual words
      const searchWords = trimmedSearch.split(/\s+/);

      // Construct an array of regex conditions for each word
      const orConditions = searchWords.map((word) => ({
        $or: [
          { title: { $regex: word, $options: "i" } },
          { description: { $regex: word, $options: "i" } },
        ],
      }));

      // Combine the conditions using logical OR
      query.$or = orConditions;
    }

    if (category) {
      query.category = category;
    }

    if (karats) {
      query.karats = karats;
    }

    if (stones) {
      query.stones = stones;
    }

    if (weight) {
      if (weight === "10+") {
        // For weight greater than 10 tola
        query["weights.tola"] = { $gt: 10 };
      } else {
        // For other weight ranges
        const [min, max] = weight.split("-").map(Number);
        query["weights.tola"] = { $gte: min, $lte: max };
      }
    }

    const listings = await Listing.find(query).sort({ createdAt: -1 });

    if (location) {
      const coord = await geocoder.geocode({ address: location });
      const userCoordinates = {
        latitude: coord[0].latitude,
        longitude: coord[0].longitude,
      };

      // Calculate distances for each listing
      listings.forEach((listing) => {
        const listingCoordinates = {
          latitude: listing.location.coordinates[1], // Assuming latitude comes first
          longitude: listing.location.coordinates[0],
        };
        // Calculate distance between user's location and listing's location
        listing.distance = calculateDistance(
          userCoordinates,
          listingCoordinates
        );
      });

      // Filter listings within a certain radius (e.g., 50 km)
      const maxDistance = 100; // in kilometers
      const filteredListings = listings.filter(
        (listing) => listing.distance <= maxDistance
      );

      // Sort filtered listings by distance
      filteredListings.sort((a, b) => a.distance - b.distance);

      // Return the filtered and sorted listings to the client
      res.status(200).json(filteredListings);
    }

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  createListing,
  getLiveListings,
  getListingsById,
  getSimilarListings,
  likeListing,
  unlikeListing,
  getLikedStatus,
  getFavoritelistings,
  getUserListings,
  deleteListing,
  downloadImageFromURL,
  editListing,
  SetListingSold,
  getListings,
};
