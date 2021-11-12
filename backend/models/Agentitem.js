const mongoose = require("mongoose")

const Schema = mongoose.Schema

const agentitemSchema = new Schema({
  itemId: {
    type: String,
    required: true,
  },

  itemName: {
    type: String,
    required: true,
  },

})

const AgentItem = mongoose.model("item", agentitemSchema)

module.exports = AgentItem