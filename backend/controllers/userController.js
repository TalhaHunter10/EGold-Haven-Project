const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

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
    const { name, password, remember } = req.body;

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

        if(remember === true)
        {
            //Send HTTP-only cookie
            res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 604800),
            sameSite: "none",
            secure: true
            
        })
        }else{
            //Send HTTP-only cookie
            res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 3600),
            sameSite: "none",
            secure: true
        })
        }
        

        const { _id, name, email, phoneno, status } = user
        res.status(200).json({
            _id, name, email, phoneno, status, token

        })

    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});

const googleSignIn = asyncHandler(async (req, res) => {

    const { tokenId } = req.body;

    try {
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.CLIENT_ID,
      });

      const { email } = ticket.getPayload();
  
      // Check if the email exists in the database
      let user = await User.findOne({ email });
  
      if (!user) {
        user = await User.create({
          email,
          name,
          phoneno: "###########",
          password: '<#@#@#@#@#@>',
          status:'user'
        });
      }
  
      // Generate token
      const token = generateToken(user._id);
  
      const { _id, phoneno, name, status } = user;

      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 3600),
        sameSite: "none",
        secure: true
    })
      res.status(200).json({
        _id, name, email, phoneno, status, token
      });

    } catch (error) {
      console.error('Google Sign-In Error:', error);
      res.status(500).json({ message: 'Google Sign-In Error' });
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


const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (verified) {
        const user = await User.findById(verified.id).select("-password");
        res.json({ verified: true , id: verified.id , status: user.status, user:user, token: token});
    }
    return res.json(false);
});

const updateUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);
    if(user){
        const { name, email, phoneno } = user;
        user.email =req.body.email || email,
        user.name = req.body.name || name,
        user.phoneno =req.body.phoneno || phoneno

        const updatedUser = await user.save();
        res.status(200).json({message: "User Updated Successfully", user: updatedUser})
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
            res.status(200).json({message: "Password Change Successful"});
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
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
    googleSignIn
}