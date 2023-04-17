const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "נדרשת סיסמא"],
    min: 6,
  },
  email: {
    type: String,
    required: [true, "נדרש אימייל"],

    lowercase: true,
    unique: true
  },

  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip"
    }
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      }
    }
  ],
  verifytoken:{
    type:String,
  }
 });

var User = mongoose.model('User', userSchema);
module.exports = User;