const mongoose = require("mongoose");

let Schema = mongoose.Schema;

//Schema Creation of User Details
const userSchema = new Schema({
  reg_number: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: String,
  lastName: String,
  dob: Date,
  department: String,
  phone: Number,
  password: {
    type: String,
    required: true,
  },
  arrers: Number,
  blocked: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
