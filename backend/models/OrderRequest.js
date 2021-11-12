const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderrequestSchema = new Schema({

 
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
    }
    

});

const OrderRequest = mongoose.model("OrderRequest", orderrequestSchema);
  
module.exports = OrderRequest;