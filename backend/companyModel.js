const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Not Available"],
    default: "Not Available",
  },
  users: {
    type: Array,
    default: [],
    of: new Schema({
      reg_number: {
        type: String,
      },
      email: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      dob: {
        type: String,
      },
      department: {
        type: String,
      },
      phone: {
        type: String,
      },
      arrers: {
        type: String,
      },
    }),
  },
});

const companyModel = mongoose.model("company", companySchema);

module.exports = companyModel;
