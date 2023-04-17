const User = require("../models/User");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keySecretForgotPassw = "352"
const nodemailer = require("nodemailer");

//get the userId and assign new JWT token
const createToken = (id) => {
  return jwt.sign({ id }, "SSK", { expiresIn: '24h' });
};

const getAllUsers = async () => {
    const users = await User.find({});
    return users;
};

const getUserById = async (req, res) => {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(user);
            res.status(200).json(user);
        }
    });
};


const register = async (req, res) => {
  try {
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password });
      res.status(201).json({ user: user.id, created: true });
  } catch (err) {
      console.log(err);
      const errors = handleErrors(err);
      res.json({ errors, created: false });
  }

}

const getUserLogin = async (email, password) => {
  console.log(email);
  console.log(password);
  if (email == "" && password == "") {
      throw Error("empty email and password");
  }
  if (password == "") {
      throw Error("empty password");
  }
  if (email == "") {
      throw Error("empty email");
  }
  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
      if (password == user.password) {
          console.log(user);
          return user;
      }
      throw Error("סיסמא שגויה");
  }
  throw Error("אימייל שגוי");
}


const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("startlogin")

  try {
      const user = await getUserLogin(email, password);
      const token = createToken(user.id);
      res.cookie("jwt", token);
      console.log("finishlogin")
      res.status(200).json({ user: user.id, status: true });
  } catch (err) {
      console.log('error occourd');
      const errors = handleErrors(err);
      console.log(errors);
      res.json({ errors, status: false });
  }
}

const deleteUser = async (request, response) => {
    console.log("delete");
    console.log(request.params.id);
    try {
        const user = await User.findByIdAndDelete(request.params.id);
        if (!user) response.status(404).send("No item found");
        response.status(200).json(user);
    } catch (error) {
        response.status(500).send(error);ז
    }
}

const updateUser = async (request, response) => {
    try {
        const user = await User.findByIdAndUpdate(request.params.id, { $set: request.body }, { new: true });
        console.log(user);
        if (!user) {
            response.status(404).send("No item found to update");
        }
        response.status(200).json(user);
    } catch (error) {
        console.log("error");
        response.status(500).send(error);
    }
}


const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "empty email and password") {
      errors.email = "נדרש אימייל";
      errors.password = "נדרשת סיסמא";
      return errors;
  }
  if (err.message === "empty email") {
      errors.email = "נדרש אימייל";

  }
  if (err.message === "empty password") {
      errors.password = "נדרשת סיסמא";
      return errors;
  }
  if (err.message === "אימייל שגוי") {
      errors.email = "אמייל לא רשום";
  }


  if (err.message === "סיסמא שגויה") {
      errors.password = "סיסמא שגויה";
  }

  //register error
  if (err.code === 11000) {
      errors.email = "אמייל רשום במערכת";
      return errors;
  }

  //register error
  if (err.message.includes("User validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
      });
      console.log(errors);
  }

  return errors;
};

// const getUserConnected = async(req) => {
async function getUserConnected(req){
        console.log("insert getUserConnected")
        const token = req.cookies.jwt;
        if (token) {
           try{

           jwt.verify(
            token,
            "SSK",
             async(err, decodedToken) => {
              if (err) {
                console.log("ERROR");
                // res.json({ status: false });
           
              } 
              else {
                console.log(decodedToken.id);
                // try{
                    console.log('hi');
                const user = await User.findById(decodedToken.id);
                console.log('by');
                console.log('the user is');
                console.log(user);
                    return user;
                    
                // }
                // if (user) res.json({ status: true, user: user });
                // else res.json({ status: false });
                // catch(error){
                //      console.log('error in find by id');
                // }
              }

            }
          );
        } 
     
    //   else {
    //     //   res.json({ status: false });
         
    //     }
    catch(error){
        console.log('error in find by id');
   }
}
    
};



let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
  
      user: 'meytal106@gmail.com',
      pass: 'stxtnxwfjpfwgryq'
  
    }
  });
  // send email Link For reset Password

const sendLink= async (req, res) => {
    console.log(req.body)
    const { email } = req.body;
    console.log(email)
  
    if (!email) {
      res.status(401).json({ status: 401, message: "Enter Your Email" })
    }
  
    try {
  
      const userfind = await User.findOne({ email: email });
      console.log(userfind)
  
      if(userfind){
  
        const token = jwt.sign({ _id: userfind._id }, keySecretForgotPassw, {
          expiresIn: "900s"
        });
    
        console.log(token);
        const setusertoken = await User.findByIdAndUpdate({ _id: userfind._id }, { verifytoken: token }, { new: true });
        console.log(setusertoken.verifytoken)
        console.log(userfind._id)
  
        if (setusertoken) {
          console.log("ff")
          let mailOptions = {
    
            from: "TripOnClick",
            to: email,
            subject: "קישור לאיפוס סיסמה עבור אתר TripOnClick",
            text: `לקוח יקר,
  מטעמי אבטחה ולמען שמירה על פרטיותך קישור זה יהיה זמין במשך כ-15 דקות בלבד.
  http://localhost:3000/passwordreset/${userfind._id}/${setusertoken.verifytoken}
             
    כאן לשירותך, צוות אתר TripOnClick
    
    (אין להשיב למייל זה)`
          }
    
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("error", error);
              res.json({ status: 401, message: "אימייל לא נשלח" })
            } else {
              console.log("Email sent", info.res);
              res.json({ status: 201, message: "הקישור נשלח בהצלחה לכתובת האימייל שהזנת" })
            }
          })
    
        }
    
      }
      else{
        console.log("user not find")
        res.json({ status: 500, message: "משתמש לא קיים" })
      }
      // token generate for reset password
  
    } catch (error) {
      console.log("IN CATCH"
      )
      res.json({ status: 401, message: "משתמש לא קיים" })
    }
}  

const userAuth = async(req, res)=>{
    const { id, token } = req.params;

    try {
      const validuser = await User.findOne({ _id: id, verifytoken: token });
  
      const verifyToken = jwt.verify(token, keySecretForgotPassw);
     
      if (validuser && verifyToken) {
           res.status(201).json({ status: 201, validuser })
  
        console.log("ok")
      }
        else{
          console.log("error")
        }
      } catch (error) {
        console.log("! Token Expired")
    
        res.status(401).json({ status: 401, error })
      }
  }

const changePassword = async(req, res)=>{
    const { id, token } = req.params;
    const { password } = req.body;
  
  
    try {
      //const validuser = await User.findOne({ _id: id, verifytoken: token });
  
       const verifyToken = jwt.verify(token, keySecretForgotPassw);
     
      if (verifyToken ) {
          // const salt = await bcrypt.genSalt();
          // const newpassword = await bcrypt.hash(password, salt);
          const setnewuserpass = await User.findByIdAndUpdate({ _id: id }, { password: password });
          setnewuserpass.save();
          res.status(201).json({ status: 201, setnewuserpass })
      }
         else {
          res.status(401).json({ status: 401, message: "user not exist" })
        }
      
  
    } catch (error) {
      console.log("! Token Expired")
  
      res.status(401).json({ status: 401, error })
    }
  
  }
module.exports = {changePassword,sendLink,userAuth, getAllUsers, register, getUserById, deleteUser, updateUser, login, getUserConnected };