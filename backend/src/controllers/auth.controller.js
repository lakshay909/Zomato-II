require("dotenv").config();
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model")
const foodPartnerModel = require("../models/foof-partner.model");
const jwtSecret = require('jsonwebtoken')


async function registerUser(req, res){
    const {fullName, email, password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        email
    })

    if(isUserAlreadyExist){
        return res.status(400).json({
            message: "User Already Exist."
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword        
    })
    const token = jwtSecret.sign({
        id: user._id,
    },process.env.JWT_SECRETKEY)

    res.cookie("token",token);

    res.status(201).json({
    message: "User registered successfully.",
    user:{
        _id: user._id,
        email: user.email,
        fullName: user.fullName
    }        
    })
}

const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Email or password is incorrect",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "07037307e8c351035f878e462768e0dd",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


function logoutUser(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message: "User logout successfully."
    });
}

async function registerfoodPartner(req, res){
    const {fullName, email, password} = req.body;

    isfoodPartnerExist = await foodPartnerModel.findOne({
        email
    })

    if(isfoodPartnerExist){
        return res.status(400).json({
            message: "Food Partner already exist."
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const foodPartner = foodPartnerModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwtSecret.sign({
        id: foodPartner._id,
    },"07037307e8c351035f878e462768e0dd")

    res.cookie("token",token);

    res.status(201).json({
    message: "Food Partner registered successfully.",
    FoodPartner:{
        _id: foodPartner._id,
        email: foodPartner.email,
        fullName: foodPartner.fullName
    }        
    })
}

async function loginfoodPartner(req, res){
    const {email, password} = req.body;

    const isfoodPartnerExist = await foodPartnerModel.findOne({
        email
    });

    if(!isfoodPartnerExist){
        return res.status(400).json({
            message: "Food Partner does not exist."
        })
    }

    const isPasswordMatched = bcrypt.compare(
        password,
        isfoodPartnerExist.password
    )

    if(!isPasswordMatched){
        return res.status(400).json({
            message: "email or password is incorrect"
        })
    }

    const token = jwt.sign(
      { id: isfoodPartnerExist._id },
      "07037307e8c351035f878e462768e0dd",
      { expiresIn: "7d" }
    );

    res.cookie("token", token,);

    res.status(200).json({
      message: "Food Partner logged in successfully",
      user: {
        _id: isfoodPartnerExist._id,
        fullName: isfoodPartnerExist.fullName,
        email: isfoodPartnerExist.email,
      },
    });
}

function logoutfoodPartner(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message: "Food Partner logout successfully."
    });
}

module.exports ={
    registerUser,
    loginUser,
    logoutUser,
    registerfoodPartner,
    loginfoodPartner,
    logoutfoodPartner
}