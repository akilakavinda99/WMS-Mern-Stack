const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addtoreturnSchema = new Schema({

       
    itemID:{
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
    batchNo: {
        type: String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
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
const Addtoreturn = mongoose.model("addtoreturn",addtoreturnSchema);

module.exports = Addtoreturn;