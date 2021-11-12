const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestmaterialSchema = new Schema({

      itemName: {
      type: String,
      required: true,
      },

      quantity: {
        type: String,
        required: true,
      },
    
      requestdate: {
        type: String,
        required: true,
      },

      bdate: {
        type: String,
        required: true,
      }
      

  });
  
  const RequestMaterial = mongoose.model("RequestMaterial", requestmaterialSchema);
  
  module.exports = RequestMaterial;