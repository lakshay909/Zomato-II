const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const {v4: uuid} = require('uuid');

async function createFood(req, res){

    console.log(req.foodPartner);

    console.log(req.body);

    console.log(req.file);

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
    
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })
    res.status(201).json({
        message: "Food created successfully.",
        food: foodItem
    })
}

async function getFoodItem(req, res){
    const foodItem = await foodModel
    .find({})
    res.status(200).json({
        message: "Food item fetched successfully.",
        foodItem
    })
}

module.exports = {
    createFood,
    getFoodItem,
}