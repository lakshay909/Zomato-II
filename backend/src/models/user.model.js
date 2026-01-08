const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        fullName:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: [true, 'Email address is required'], 
            unique: true,                                 
            lowercase: true,                               
            // match: [/^[^\\s@]+@[^\\s@]+\.[^\\s@]+$/, 'Please fill a valid email address'] 
        },
        password:{
            type: String
        }
    },
    {
        Timestamp: true
    }
)

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;