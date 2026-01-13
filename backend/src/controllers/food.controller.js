const foodModel = require('../models/food.model');

async function createFood(req, res){
    // const{name, video, description} = req.body;

    // const food = await foodModel.create({
    //     name,
    //     video,
    //     description,
    // })
    console.log(req.foodPartner);

    console.log(req.body);

    console.log(req.file);

    res.send("food item created");
}

module.exports = {
    createFood
}