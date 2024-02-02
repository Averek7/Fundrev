const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  password: {
    type: String,
  },
  companyName: {
    type: String,
  },
  businessDescription: {
    type: String,
  },
  revenue: {
    type: String,
  },
  interestedStartups: {
    type: Boolean,
    ref: "Startup",
  },
  sales:{
    
    
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
