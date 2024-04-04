const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const aluminiSchema = new Schema({
  name:
  {
    type: String,
    required: true,
  },
  company:
  {
    type: String,
    required: true,
  },
  department:
  {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  }
});

const aluminiModel = mongoose.model("alumini", aluminiSchema);

module.exports = aluminiModel;
