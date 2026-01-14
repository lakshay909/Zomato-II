const express = require('express');
const cookieParser = require('cookie-parser')
const authRoute = require('../src/routes/auth.route')
const foodRoute = require('../src/routes/food.route')
const foodPartnerRoute = require('../src/routes/food-partner.route')
const cors = require('cors');

const app = express();
app.use(cors({
    origin: ' http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("Helloworld!!");
})

app.use("/api/auth",authRoute);
app.use("/api/food",foodRoute);
app.use("/api/food-partner",foodPartnerRoute);

module.exports = app;