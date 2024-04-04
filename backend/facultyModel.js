const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const facultySchema = new Schema({
  name:
  {
    type: String,
    required: true,
  },
  designation:
  {
    type: String,
    required: true,
  },
  department:
  {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true,
  }
});

const facultyModel = mongoose.model("faculty", facultySchema);

module.exports = facultyModel;
