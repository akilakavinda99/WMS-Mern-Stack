const mongoose = require("mongoose")

const Schema = mongoose.Schema

const qualitypassedSchema = new Schema({
  itemID: {
    type: String,
    required: true,
  },

  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
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

  receivedDate: {
    type: String,
    required: true,
  },
 
});




const Qualitypasseditem = mongoose.model("qualitypassed", qualitypassedSchema)

module.exports = Qualitypasseditem
