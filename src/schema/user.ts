import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: String,
    passwordHash: String,
})

module.exports = mongoose.model('user', schema);