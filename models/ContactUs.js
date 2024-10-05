const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ContactUs = new Schema({
    name:{ 
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    note:{
        type: String,
        required: true
    }

})

module.exports = mongoose.model("ContactUs",ContactUs)