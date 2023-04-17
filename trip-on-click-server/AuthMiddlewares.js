const User = require("./models/User");
const jwt = require("jsonwebtoken");

//check if jwt is correct
module.exports.checkUser = (req, res, next) => {
  console.log("insert checkUser")
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(
      token,
      "SSK",
      async (err, decodedToken) => {
        if (err) {
          console.log("ERROR");
          res.json({ status: false });
          next();
        } else {
          console.log(decodedToken)
          console.log(decodedToken.id);
          const user = await User.findById(decodedToken.id);
          console.log(user);
          if (user) res.json({ status: true, user: user });
          else res.json({ status: false });
          next();
        }
      }
    );``
  } else {
    res.json({ status: false });
    next();
  }
};