const express = require("express");
const app = express();
const bodyParser =require('body-parser');
const fileUpload =require('express-fileupload')
const cookieParser = require("cookie-parser");
const path=require('path');


//configure dot env
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/.env" });

//
app.use(express.json({limit: '50mb'}));
//set cookie parser to access cookie data
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));
app.use(fileUpload());
//Route Import

const product = require("./routes/productRoute");
app.use("/api/v1", product);

const userroute = require("./routes/userRoute");
app.use("/api/v1", userroute);

const order =require("./routes/orderRoute");
app.use("/api/v1",order)

const payment =require("./routes/paymentRoute");
app.use("/api/v1",payment)

//initalized frontend
app.use(express.static(path.join(__dirname,'../Frontend/build')));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../Frontend/build/index.html'))
})


//middle ware for error
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;
