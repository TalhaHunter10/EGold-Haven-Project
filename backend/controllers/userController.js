const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Token = require("../models/tokenModel");
const { response } = require("express");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "6h" })
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phoneno, password, status } = req.body

    if (!name || !email || !phoneno || !password || !status) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }


    const userExistsEmail = await User.findOne({ email })
    const userExistsPhone = await User.findOne({ phoneno })

    if (userExistsEmail) {
        res.status(400)
        throw new Error("Email has already been registered")
    }

    if (userExistsPhone) {
        res.status(400)
        throw new Error("Phone No. has already been registered")
    }

    //Create new User
    const user = await User.create({
        name,
        email,
        phoneno,
        password,
        status
    })

    if (user) {
        const { _id, name, email, phoneno, status } = user
        res.status(201).json({
            _id, name, email, phoneno, status

        })
    } else {
        res.status(400);
        throw new Error("Invalid User Data")
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    //validation
    if (!name || !password) {
        res.status(400);
        throw new Error("Please Enter Email and Password");
    }

    let user;
    if (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(name)) {
        user = await User.findOne({ email: name });

    } else if (/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm.test(name)) {
        user = await User.findOne({ phoneno: name });

    } else {
        res.status(400);
        throw new Error("Invalid Email or Phone Number Format");
    }

    if (!user) {
        res.status(400);
        throw new Error(`User does not exist, SignUp First...`);
    }

    // Check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
        res.status(400);
        throw new Error("Invalid Password");
    }

    if (user && passwordIsCorrect) {

        //Generating Token
        const token = generateToken(user._id);

        //Send HTTP-only cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 21600),
            sameSite: "none",
            secure: true
        })

        const { _id, name, email, phoneno, status } = user
        res.status(200).json({
            _id, name, email, phoneno, status, token

        })

    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});

const logOut = asyncHandler(async (req, res) => {

    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true
    })
    return res.status(200).json({ message: "Successfully Logged Out" })

});

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        const { _id, name, email, phoneno, status } = user
        res.status(200).json({
            _id, name, email, phoneno, status

        })
    } else {
        res.status(400);
        throw new Error("User not Found !!");
    }
});

const getUserStatus = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        const { status } = user
        res.status(200).json({
            status

        })
    } else {
        res.status(400);
        throw new Error("Request Failed (Status) !!");
    }
});

const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (verified) {
        res.json(true);
    }
    return res.json(false);
});

const updateUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);
    if(user){
        const { name, email, phoneno } = user;
        user.email = email,
        user.name = req.body.name || name,
        user.phoneno = phoneno

        const updatedUser = await user.save();
        res.status(200).json({
                _id : updatedUser._id,
                 name : updatedUser.name,
                  email : updatedUser.email,
                   phoneno : updatedUser.phoneno,
                   status : updatedUser.status
        })
    }else{
        res.status(404)
        throw new Error("User not Found")
    }
});


const changePassword = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        const {oldpassword , password} = req.body
        if(!oldpassword || !password){
            res.status(400)
            throw new Error("Please add old and new password")
        }

        const passwordIsCorrect = await bcrypt.compare(oldpassword, user.password);
        if(passwordIsCorrect){
            user.password = password;
            await user.save();
            res.status(200).send("Password change Successful");
        }else{
            res.status(400)
            throw new Error("Old password is incorrect")
        }
    }else{
        res.status(404)
        throw new Error("User not Found")
    }
});

const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body
    const user = await User.findOne({email})

    if(!user){
        res.status(404)
        throw new Error("This email is not registered with any account. Please Try Again");
    }

    let token = await Token.findOne({userId: user._id})
    if(token){
        await token.deleteOne();
    }

    let resetToken = crypto.randomBytes(32).toString("hex") + user._id

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt:Date.now() + 30 *(60 * 1000) //30 minutes
    }).save()

    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

    const message = `
      <h2>Hello ${user.name}</h2>
      <p>Kindly click on the url below to reset your password</p>
      <p>The link is valid for 30 minutes !!!</p>

      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

      <p>Regards...</p>
      <p>Egold Haven Team</p>
    `;

    const subject = "Password Reset Request for Egold Haven Account";
    const send_to = user.email
    const sent_from = process.env.EMAIL_USER
    
    try{
        await sendEmail(subject, message, send_to, sent_from)
        res.status(200).json({success:true, message:"Reset Email Sent"})
    }catch(error){
        res.status(500)
        throw new Error("Email could not be Sent. Please try again !")
    }
});

const resetPassword = asyncHandler(async (req,res) =>{

    const {password} = req.body;
    const {resetToken} = req.params;

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: {$gt: Date.now()}
    })

    if(!userToken){
        res.status(500)
        throw new Error("Invalid or Expired Token !");
    }

    const user = await User.findOne({_id:userToken.userId})
    user.password = password;
    await user.save()
    res.status(200).json({
        message: "Password Reset Successful, Please Login"
    })

});

module.exports = {
    registerUser,
    loginUser,
    logOut,
    getUser,
    getUserStatus,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword
}