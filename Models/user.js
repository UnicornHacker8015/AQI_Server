const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    age: Number,
    contactNumber: String,
    email: String,
    address: String,
    profilePhoto: String,
    additionalInfo: String,
});

module.exports = mongoose.model('User', userSchema);
