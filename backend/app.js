//import modules 
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyparser = require("body-parser");
const errorHandler = require("./middlewares/errormiddleware")
const cookieParser = require("cookie-parser")
const path = require("path")
require('dotenv').config();

//app
const app = express();
app.use(bodyparser.json())
app.use(express.urlencoded({extended: false}));

//database
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() =>console.log("DB cONNECTED")).catch((err) => console.log("Db Connection Error !" , err));

//middleware
app.use(cookieParser())
app.use(morgan('dev'));
app.use(cors({origin: process.env.FRONTEND_URL , credentials:true}));
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

//routes
const userRoutes = require("./routes/userRoute");
app.use('/api/users' , userRoutes);

const listingRoutes = require("./routes/listingRoute");
app.use('/api/listings' , listingRoutes);

const jewelerRoutes = require("./routes/jewelerRoute");
app.use('/api/jeweler' , jewelerRoutes);

const adminRoutes = require("./routes/adminRoute");
app.use('/api/admin' , adminRoutes);

const productRoutes = require("./routes/productRoute");
app.use('/api/product' , productRoutes);

const chatRoutes = require("./routes/chatRoutes");
app.use('/api/chat' , chatRoutes);

const messageRoutes = require("./routes/messageRoutes");
app.use('/api/message' , messageRoutes);


//ports
const port = process.env.PORT || 8080;



app.use(errorHandler)


//listener
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: process.env.FRONTEND_URL,
      // credentials: true,
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id === newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });