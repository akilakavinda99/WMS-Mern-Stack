const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

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
})

//acceptedorder database table route
const Order = mongoose.model("acceptedorder",orderSchema);

module.exports = Order;