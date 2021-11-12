const router = require("express").Router()
let Stockitems = require("../models/stkitemh")

router.route("/stkiteminh").post((req, res) => {
  const itemID = req.body.itemID
  const itemName = req.body.itemName
  const quantity = req.body.quantity
  const batchNo = req.body.batchNo
  const itemDes = req.body.description
  const receivedDate = req.body.receivedDate

  const newStockItems = new Stockitems({
    itemName,
    itemID,
    quantity,
    batchNo,
    itemDes,
    receivedDate,
  })

  newStockItems
    .save()
    .then(() => {
      res.json("Stock Item Added")
    })
    .catch((err) => {
      console.log(err)
    })
})

router.route("/stkhisallview").get((req, res) => {
  Stockitems.find().then((items) => {
    res.json(items)
  })
})

router.route("/updatestkhistoy/:itemId").put(async (req, res) => {
  let userID = req.body.itemID
  console.log(userID)
  const { itemID, itemName, quantity, itemDes, batchNo } = req.body

  //   const query = { itemID: "CF001", $inc: { quantity: quantity }

  const updateItem = {
    itemID,
    itemName,
    quantity,
    itemDes,
    batchNo,
    receivedDate,
  }

  await Stockitems.findOneAndUpdate(
    {
      itemID: itemID,
    },
    { $inc: { quantity: quantity } }
  )
    .then(() => {
      res.status(200).send({ status: "Item updated" })
      console.log(itemID)
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error With updating data", error: err.message })
    })
})

router.route("/stkhisdelete/:id").delete(async (req, res) => {
  let itemID = req.params.id

  await Stockitems.findByIdAndDelete(itemID)
    .then(() => {
      res.status(200).send({ status: "Item deleted" })
    })
    .catch((err) => {
      res.status(500).send({ status: "Error with delete", error: err.message })
    })
})

module.exports = router
