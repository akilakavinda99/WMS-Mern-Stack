const router = require("express").Router()
let Stockitems = require("../models/stkitem")

router.route("/stkitemin").post((req, res) => {
  const itemID = req.body.itemID
  const itemName = req.body.itemName
  const quantity = req.body.quantity
  const batchNo = req.body.batchNo
  const itemDes = req.body.description
  const ft = req.body.ft

  const newStockItems = new Stockitems({
    itemName,
    itemID,
    quantity,
    batchNo,
    itemDes,
    ft,
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

router.route("/stklawview").get((req, res) => {
  query = { quantity: { $lt: 100 } }
  Stockitems.find(query).then((items) => {
    res.json(items)
  })
})

router.route("/stkproview").get((req, res) => {
  query = { itemID: /^CP/ }
  Stockitems.find(query).then((items) => {
    res.json(items)
  })
})

router.route("/stkallview").get((req, res) => {
  // (item1) => {
  //   Stockitems.aggregate([
  //     {
  //       $group: {
  //         _id: "$stkitem",
  //         quantity: { $sum: "stockitems.quantity" },
  //       },
  //     },
  //   ]).then((items) => {
  //     res.json(items)
  //   })
  // }
  //   query = ""
  //   Stockitems.find()
  //     .then((items) => {
  //       Stockitems.aggregate([
  //         {
  //           $group: {
  //             _id: "$stkitem",
  //             quantity: { $sum: "stockitems.quantity" },
  //           },
  //         },
  //       ])

  //       //res.json(items)
  //       console.log(items)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // })

  // res.json(Stockitems.ft)
  // console.log(Stockitems.ft)
  Stockitems.find().then((items) => {
    res.json(items)
  })
})

// router.route("/rawview").get((req, res) => {
//   Stockitems.find().then((items) => {
//     const query = {}
//     res.jason(items)
//   })
// })

router.route("/stkdelete/:id").delete(async (req, res) => {
  let itemID = req.params.id

  await Stockitems.findByIdAndDelete(itemID)
    .then(() => {
      res.status(200).send({ status: "Item deleted" })
    })
    .catch((err) => {
      res.status(500).send({ status: "Error with delete", error: err.message })
    })
})

router.route("/updatestk/:itemID").put(async (req, res) => {
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

router.route("/updatestkitem/:itemID").put(async (req, res) => {
  let userID = req.body.itemID
  console.log(userID)
  const { itemID, itemName, itemDes, batchNo } = req.body

  //   const query = { itemID: "CF001", $inc: { quantity: quantity }

  const updateItem = {
    itemID,
    itemName,
    itemDes,
    batchNo,
  }

  const update = await Stockitems.findOneAndUpdate(itemID, updateItem)
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

router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id
  let Itemn = await Stockitems.findById(userID)
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
