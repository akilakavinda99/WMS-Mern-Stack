const router = require("express").Router()
let Item = require("../models/item")

//Insert an Item
router.route("/addstk").post((req, res) => {
  const itemID = req.body.itemID
  const itemName = req.body.itemName
  const itemType = req.body.itemType
  const mUnit = req.body.mUnit
  const itemDes = req.body.itemDes

  const newItem = new Item({
    itemID,
    itemName,
    itemType,
    mUnit,
    itemDes,
  })

  newItem
    .save()
    .then(() => {
      res.json("Item Added")
    })
    .catch((err) => {
      console.log(err)
    })
})

//Retreve Items
router.route("/vinventory").get((req, res) => {
  //const query = { name: "sugar" }
  Item.find()
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
    })
})

//Retreve Items
router.route("/vinventoryRW").get((req, res) => {
  const query = { itemType: "Raw Material" }
  Item.find(query)
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
    })
})

//Update item route
router.route("/updateinventoryitem/:itemID").put(async (req, res) => {
  let userID = req.params.id
  const { itemID, itemName, itemType, mUnit, itemDes } = req.body

  const updateItem = {
    itemID,
    itemName,
    itemType,
    mUnit,
    itemDes,
  }

  const update = await Item.findOneAndUpdate(itemID, updateItem)
    .then(() => {
      res.status(200).send({ status: "Item updated" })
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error With updating data", error: err.message })
    })
})

router.route("/delete/:itemID").delete(async (req, res) => {
  let userID = req.params.id

  await Item.findByIdAndDelete(userID)
    .then(() => {
      res.status(200).send({ status: "Item deleted" })
    })
    .catch((err) => {
      res.status(500).send({ status: "Error with delete", error: err.message })
    })
})

router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id
  let Itemn = await Item.findById(userID)
    .then((initem) => {
      res.status(200).send({ status: "Item fetched", initem })
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message })
    })
})

module.exports = router
