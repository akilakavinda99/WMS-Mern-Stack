const mongoose = require("mongoose")

const Schema = mongoose.Schema

const rawmaterialreqSchema = new Schema({
  itemID: {
    type: String,
    required: false,
  },

  itemName: {
    type: String,
    required: true,
  },

  quantity: {
    type: String,
    required: true,
  },

  bdate: {
    type: String,
    required: true,
  },
})

const RawMaterialReq = mongoose.model("RawMaterialReq", rawmaterialreqSchema)

module.exports = RawMaterialReq
