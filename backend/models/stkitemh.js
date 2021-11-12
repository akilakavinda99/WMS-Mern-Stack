const mongoose = require("mongoose")

const Schema = mongoose.Schema

const stkitemSchema = new Schema({
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

  itemDes: {
    type: String,
    required: false,
  },

  batchNo: {
    type: String,
    required: false,
  },

  receivedDate: {
    type: String,
    required: true,
  },
})

// const ft = (items) => {
//   Stockitems.aggregate([
//     {
//       $group: {
//         _id: "$stkitem",
//         quantity: { $sum: "stockitems.quantity" },
//       },
//     },
//   ])
// }
// .then((items) => {
//   // res.json(items)
// })

const stkitemh = mongoose.model("stkitemh", stkitemSchema)

module.exports = stkitemh
