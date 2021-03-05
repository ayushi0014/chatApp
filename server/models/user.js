const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    firstname: String,
    lastname: String,
    roomname: String
})

module.exports = mongoose.model('user', UserSchema);