const express = require('express');
const cookieParser = require('cookie-parser')
const authRoute = require('../src/routes/auth.route')
const foodRoute = require('../src/routes/food.route')

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Helloworld!!");
})

app.use("/api/auth",authRoute);
app.use("/api/food",foodRoute);

module.exports = app;