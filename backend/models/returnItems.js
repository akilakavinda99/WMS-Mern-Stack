const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReturnitemsSchema = new Schema({
  itemID: {
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
  batchNo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
 
});

const Returnitems = mongoose.model("returnitems", ReturnitemsSchema);

module.exports = Returnitems;