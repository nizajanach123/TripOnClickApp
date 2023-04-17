const userService = require("../services/user.service");
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const { checkUser } = require('../AuthMiddlewares');
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const keySecretForgotPassw = "352"
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const users = await userService.getAllUsers();
    response.status(200).send(users);
  } catch (e) {
    console.log(e);
  }
});


router.get("/:id/trips",async (request, response) => {
  try {
    const user = await User.findById(request.params.id).populate('trips');
    console.log(user);
    response.send(user.trips);

  }
  catch (e) {
  response.status(500).send(e);
}
});


router.get("/:id", async (request, response) => {
  try {
    await userService.getUserById(request,response);
  } catch (e) {
    response.status(500).send(e);
  }
});



router.post("/register",  (request, response) => {
  try {
     userService.register(request, response);
  
    } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/login", async (request, response) => {
  try {
    await userService.login(request, response);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.patch("/:id", async (request, response) => {
  try {
    await userService.updateUser(request, response);
    console.log("works");
  }
   catch (error) {
    response.status(500).send(error);
  }
});

// send email Link For reset Password
router.post("/sendpasswordlink", async (req, res) => {
  try {
    await userService.sendLink(req, res);
  }
  catch (error) {
    response.status(500).send(error);
  }
});

// check token
router.post("/:id/:token" ,async (req, res) => {
  try {
    await userService.userAuth(req, res);
  }
  catch (error) {
    res.status(500).send(error);
  }
});

//change password
router.post("/change/:id/:token", async (req, res) => {
  try {
    await userService.changePassword(req, res);
  }
  catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
