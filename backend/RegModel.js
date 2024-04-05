const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({
    reg_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    arrers: {
        type: String,
        required: true
    }
});

const RegModel = mongoose.model('RegModel', regSchema);

module.exports = RegModel;