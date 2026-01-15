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
    .populate('likedBy', 'email fullName')
    res.status(200).json({
        message: "Food item fetched successfully.",
        foodItem
    })
}

async function toggleLike(req, res){
    try {
        const { foodId } = req.params;
        const userId = req.user._id;

        const food = await foodModel.findById(foodId);
        
        if (!food) {
            return res.status(404).json({
                message: "Food item not found"
            });
        }

        const isLiked = food.likedBy.includes(userId);

        if (isLiked) {
            // Unlike
            food.likedBy = food.likedBy.filter(id => id.toString() !== userId.toString());
            food.likes = Math.max(0, food.likes - 1);
        } else {
            // Like
            food.likedBy.push(userId);
            food.likes = food.likes + 1;
        }

        await food.save();

        res.status(200).json({
            message: isLiked ? "Food unliked successfully" : "Food liked successfully",
            liked: !isLiked,
            likes: food.likes,
            food
        });
    } catch (error) {
        res.status(500).json({
            message: "Error toggling like",
            error: error.message
        });
    }
}

module.exports = {
    createFood,
    getFoodItem,
    toggleLike
}