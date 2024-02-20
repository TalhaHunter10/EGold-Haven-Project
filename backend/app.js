//import modules 
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyparser = require("body-parser");
const errorHandler = require("./middlewares/errormiddleware")
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


//routes
const Routes = require("./routes/userRoute");
app.use('/api/users' , Routes);


//ports
const port = process.env.PORT || 8080;

//middleware
app.use(morgan('dev'));
app.use(cors({origins:true , credentials:true}));
app.use(express.json())
app.use(errorHandler)

//listener
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));