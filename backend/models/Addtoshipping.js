const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addtoshippingSchema = new Schema({

       
    itemId:{
        type: String,
        required: true
    },
    itemName:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    contactNo:{
        type: String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
    trackingnumber:{
        type: String,
        required: true
    },
    shippingstatus:{
        type: String,
        required: true
    }
})

//addtoshipping database table route
const Addtoshipping = mongoose.model("addtoshipping",addtoshippingSchema);

module.exports = Addtoshipping;