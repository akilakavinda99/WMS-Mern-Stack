const router = require("express").Router()
let RawMaterialReq = require("../models/RawMaterialReq")
const Supplier = require("../models/Supplier")
const JWT = require("jsonwebtoken")
const passport = require("passport")

//Request  Raw Material
router.route("/requestR").post((req, res) => {
  const itemID = req.body.itemID
  const itemName = req.body.itemName
  const quantity = req.body.quantity
  const bdate = req.body.bdate

  const newrawmaterialreq = new RawMaterialReq({
    itemID,
    itemName,
    quantity,
    bdate,
  })

  newrawmaterialreq
    .save()
    .then(() => {
      res.json("Raw Material Requested")
    })
    .catch((err) => {
      console.log(err)
    })
})

//Retreve Requested Materials
router.get(
  "/R",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "manager") {
      RawMaterialReq.find()
        .then((rawmaterialreqs) => {
          res.json(rawmaterialreqs)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      res
        .status(403)
        .json({ message: { msgBody: "You'r not an manager", msgError: true } })
    }
  }
)

router.route("/deleteR/:id").delete(async (req, res) => {
  let userID = req.params.id

  await RawMaterialReq.findByIdAndDelete(userID)
    .then(() => {
      res.status(200).send({ status: "Raw Material Request deleted" })
    })
    .catch((err) => {
      res.status(500).send({ status: "Error with delete", error: err.message })
    })
})

router.route("/getR/:id").get(async (req, res) => {
  let userID = req.params.id
  await RawMaterialReq.findById(userID)
    .then((rawmaterialreq) => {
      res
        .status(200)
        .send({ status: "Material Request fetched", rawmaterialreq })
    })
    .catch(() => {
      console.log(err, message)
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message })
    })
})

module.exports = router
