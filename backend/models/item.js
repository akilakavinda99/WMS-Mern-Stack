const mongoose = require("mongoose")

const Schema = mongoose.Schema

const itemSchema = new Schema({
  itemID: {
    type: String,
    required: true,
  },

  itemName: {
    type: String,
    required: true,
  },

  itemType: {
    type: String,
    required: true,
  },

  mUnit: {
    type: String,
    required: true,
  },

  itemDes: {
    type: String,
    required: true,
  },
})

const Item = mongoose.model("item", itemSchema)

module.exports = Item
