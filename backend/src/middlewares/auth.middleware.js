require("dotenv").config();
const foodPartnerModel = require("../models/food-partner.model");
const jwt = require(('jsonwebtoken'));

async function authfoodPartnerMiddleware(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            messgae: "Login first!!"
        })
    }

    try {
        const decoded = jwt.verify(token, "07037307e8c351035f878e462768e0dd");

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner;
        
        next();

    } catch (err) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
}

module.exports= {
    authfoodPartnerMiddleware,

}