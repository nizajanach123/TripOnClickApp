// import fs from "fs"
// const fs = require('fs')
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const app = express();
const { checkUser } = require('./AuthMiddlewares');
const tripsRoutes = require("./routes/trip.routes");
const attractionsRoutes = require("./routes/attraction.routes");
const usersRoutes = require("./routes/user.routes");
const mongoURI = 'mongodb+srv://meytal106:5YLA9Q5yXnz7R5Z5@triponclickdb.kaks7p2.mongodb.net/TOCDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('mongoDB connected!');
});



require('dotenv').config();
app.use(morgan("dev"));

const corsOptions ={
    origin:['http://localhost:3000'], 
    methods: ["GET", "POST"],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());//req.body.message
app.use(express.urlencoded({ extended: false }));



app.post("/", checkUser);

//Routes
app.use('/trips', tripsRoutes);
app.use('/users', usersRoutes);
app.use('/attractions', attractionsRoutes);

module.exports = app;