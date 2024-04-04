const mongoose = require("mongoose");

let Schema = mongoose.Schema;

//Schema Creation of admin login
const adminSchema = new Schema({

  username:
  {
    type: String,
    unique: true,
    required: true
  },
  password:
  {
    type: String,
    required: true
  }
});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
