const mongoose = require('mongoose')
require('dotenv').config()
// logic how db will connect to the server.
function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB connected!");
    })
    .catch((err)=>{
        console.log("MongoDB error: ",err);
        process.exit(1);
    })
}

module.exports = connectDB;
