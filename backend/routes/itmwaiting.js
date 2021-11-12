const router = require("express").Router()
let Qualitypasseditem = require("../models/qualitypassed")

// router.route("/add").post((req, res) => {
//   const itemName = req.body.itemName
//   const itemID = req.body.itemID
//   const quantity = req.body.quantity
//   const batchNo = req.body.batchNo
//   const description = req.body.description

//   const newQualitypasseditem = new Qualitypasseditem({
//     itemName,
//     itemID,
//     quantity,
//     batchNo,

//     description,
//   })

//   newQualitypasseditem
//     .save()
//     .then(() => {
//       res.json("Qualitypassed Item Added")
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })

router.route("/wlist").get((req, res) => {
  Qualitypasseditem.find()
    .then((passeditems) => {
      res.json(passeditems)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.route("/getitem/:id").get(async (req, res) => {
  let itemID = req.params.id
  await Qualitypasseditem.findById(itemID)
    .then((passeditems) => {
      res.status(200).send({ status: "Item fetched", passeditems })
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message })
    })
})

router.route("/vinventory").get((req, res) => {
  Qualitypasseditem.find()
    .then((qualitypasseds) => {
      res.json(qualitypasseds)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id

  try {
    await Qualitypasseditem.findByIdAndRemove(id).exec()
    res.send("Succesfully Deleted")
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
