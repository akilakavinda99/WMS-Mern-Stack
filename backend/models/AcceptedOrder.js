const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const acceptedorderSchema = new Schema({


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

const AcceptedOrder = mongoose.model("AcceptedOrder", acceptedorderSchema);
  
module.exports = AcceptedOrder;