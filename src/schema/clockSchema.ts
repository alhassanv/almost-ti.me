import mongoose from "mongoose";

const schema = new mongoose.Schema({
    clockId: String,
    formedDate: String,
    eventName: String
})

module.exports = mongoose.model('countdownClock', schema);