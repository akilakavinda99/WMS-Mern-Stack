const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const declinedorderSchema = new Schema({


    itemId: {
    type: String,
    required: true,
    },

    itemName: {
    type: String,
    required: true,
    },

    quantity: {
      type: String,
      required: true,
    },
  
    contactNo: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    }
    

});

const DeclinedOrder = mongoose.model("DeclinedOrder", declinedorderSchema);
  
module.exports = DeclinedOrder;