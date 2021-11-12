const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inboundSchema = new Schema({
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
  receivedTime: {
    type: String,
    required: true,
  },
  receivedDate: {
    type: String,
    required: true,
  },
});

const Inbounditem = mongoose.model("inbounditem", inboundSchema);

module.exports = Inbounditem;