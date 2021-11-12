const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const qualityfailedSchema = new Schema({
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
 
});

const Qualityfaileditem = mongoose.model("qualityfailed", qualityfailedSchema);

module.exports = Qualityfaileditem;