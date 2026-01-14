const express = require('express');
const router = express.Router();
const authfoodPartnerMiddleware = require('../middlewares/auth.middleware');
const foodController = require('../controllers/food.controller');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
})


router.post("/",authfoodPartnerMiddleware.authfoodPartnerMiddleware, 
    upload.single("video"),foodController.createFood);
router.get("/",authfoodPartnerMiddleware.authUserMiddleware, 
    foodController.getFoodItem);


module.exports = router;  