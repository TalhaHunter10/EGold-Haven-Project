
const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { registerUser, loginUser, logOut, getUser, getUserStatus, loginStatus, updateUser, changePassword, forgotPassword } = require("../controllers/userController");
const router =  express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logOut);
router.get("/getuser", protect, getUser);
router.get("/getuserstatus", protect, getUserStatus);
router.get("/loggedin" , loginStatus)
router.patch("/updateuser",protect, updateUser)
router.patch("/changepassword", protect, changePassword)
router.post("/forgotpassword",forgotPassword);

module.exports = router