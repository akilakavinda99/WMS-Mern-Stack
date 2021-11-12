const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const suporderhistorySchema = new Schema({

  userId: {
    type: String,
    required: true,
},

nicno:{
  type:String,
  require:true,
},
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

const SupOrderHistory = mongoose.model("SupOrderHistory",suporderhistorySchema);

module.exports = SupOrderHistory;