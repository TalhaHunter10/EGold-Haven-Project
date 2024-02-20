const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");



const registerUser = asyncHandler( async (req , res) => {
   const {name, email,phoneno, password } = req.body

   if(!name || !email || !phoneno || !password){
    res.status(400);
    throw new Error("Please fill in all required fields");
   }


   const userExistsEmail = await User.findOne({email})
   const userExistsPhone = await User.findOne({phoneno})

   if(userExistsEmail){
    res.status(400)
    throw new Error("Email has already been registered")
   }

   if(userExistsPhone){
    res.status(400)
    throw new Error("Phone No. has already been registered")
   }

   //Create new User
   const user = await User.create({
    name,
    email,
    phoneno,
    password
   })

   if(user){
    const{_id,name,email,phoneno} = user
    res.status(201).json({
        _id,name,email,phoneno

    })
   }else{
    res.status(400);
    throw new Error("Invalid User Data")
   }
});

module.exports = {
    registerUser
}