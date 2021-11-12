const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockitemSchema = new Schema({

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

    itemDes: {
      type: String,
      required: true,
    }
   
});

const StockItem = mongoose.model("StockItems", stockitemSchema);
  
module.exports = StockItem;