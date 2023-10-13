//Handling uncaught error

// process.on("uncaughtException", (err) => {
//   console.log("Error: " + err.message);
//   console.log("Shutting down the server due to UncaughtException");

//   process.exit(1);
// });

const app = require("./app");

//configure dot env
//no need on online mode only in 
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/.env" });

//connect to database
const connect = require("./config/database");




//const URL=`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.anwesj4.mongodb.net/?retryWrites=true&w=majority`
const URL1=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qdjik.mongodb.net/?retryWrites=true&w=majority`
const URL= "mongodb://localhost:27017/Ecommerce";
connect(URL1);

//configure cloudinary
const cloudinary =require('cloudinary');
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET

})

const server = app.listen(process.env.PORT, () => {
  console.log("Server is runing on Port : " + process.env.PORT);
});

// Unhandler Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting down the server due to unhandle Rejection");

  server.close(() => {
    process.exit();
  });
});
