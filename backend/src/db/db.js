const mongoose = require('mongoose')
// logic how db will connect to the server.
function connectDB(){
    mongoose.connect("mongodb://localhost:27017/food-view")
    .then(()=>{
        console.log("MongoDB connected!");
    })
    .catch((err)=>{
        console.log("MongoDB error: ",err);
        process.exit(1);
    })
}

module.exports = connectDB;
