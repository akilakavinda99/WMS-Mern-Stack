const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({

    itemid:{
        type: String,
        required: true
    },
    itemstatus:{
        type: String,
        required: true
    },
    qty:{
        type: String,
        required: true
    },
    otime:{
        type: String,
        required: true
    },
    odate:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
})

//Request database table route
const Request = mongoose.model("Request",requestSchema);

module.exports = Request;