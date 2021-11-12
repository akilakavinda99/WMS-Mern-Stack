const router = require("express").Router();
let RequestMaterial = require("../models/RequestMaterial");

//Request Material
router.route("/request").post((req,res)=>{

    const _id = req.body._id;
    const itemName = req.body.itemName;
    const quantity= req.body.quantity;
    const requestdate= req.body.requestdate;
    const bdate= req.body.bdate;

    const newrequestmaterial = new RequestMaterial({

        _id,
        itemName,
        quantity,
        requestdate,
        bdate,
    })

    newrequestmaterial.save().then(()=>{
        res.json("Material Requested")
    }).catch((err)=>{
        console.log(err);
    })

})


//Retreve Requested Materials
router.route("/viewreq").get((req, res) => {
  RequestMaterial.find()
      .then((requestmaterials) => {
        res.json(requestmaterials);
      })
      .catch((err) => {
        console.log(err);
      })
})

router.route("/updatereq/:id").put(async (req, res) => {
    let userID = req.params.id;
    const { itemID,itemName, quantity, requestdate, bdate } = req.body;
  
    const updateRequestMaterial = {
      itemName,
      quantity,
      requestdate,
      bdate
    };
  
    const update = await RequestMaterial.findByIdAndUpdate(userID, updateRequestMaterial)
      .then(() => {
        res.status(200).send({ status: "Material Request updated" });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ status: "Error With updating data", error: err.message });
      });
  });
  
  router.route("/deletereq/:id").delete(async (req, res) => {
    let userID = req.params.id;
  
    await RequestMaterial.findByIdAndDelete(userID)
      .then(() => {
        res.status(200).send({ status: "Material Request deleted" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error with delete", error: err.message });
      });
  });
  
  router.route("/getreq/:id").get(async (req, res) => {
    let userID = req.params.id;
     await RequestMaterial.findById(userID)
      .then((requestedmaterial) => {
        res.status(200).send({ status: "Material Request fetched", requestedmaterial });
      })
      .catch(() => {
        console.log(err,message);
        res.status(500).send({ status: "Error with get user", error: err.message });
      });
  });
  
  module.exports = router;