
const mongoose = require('mongoose');



const connect=async(URL)=>{

    await mongoose.connect(URL,{
        useNewUrlParser:true,useUnifiedTopology:true
    });
    console.log("Mongodb connected with server : localhost");

//in server js unhandled rehjection all radey handled so no need to use try catch here  
}

module.exports=connect;