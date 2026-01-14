const foodPartnerModel = require('../models/food-partner.model');

async function getFoodPartnerById(req, res){
    try {
        const partner = await foodPartnerModel.findById(req.params.id);
        const foodItemsByPartner = await foodModel.find({foodPartner: partner._id});
        if(!partner){
            return res.status(404).json({
                message: "Food partner not found."
            })
        }

        res.status(200).json({
            message: "Food partner fetched successfully.",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsByPartner,
            },
            
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    getFoodPartnerById
}
