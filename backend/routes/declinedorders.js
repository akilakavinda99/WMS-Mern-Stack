const router = require("express").Router();
let DeclinedOrder = require("../models/DeclinedOrder");

//Decline order
router.route("/decline").post((req,res)=>{

  const _id = req.body._id;
  const itemId = req.body.itemId;
  const itemName= req.body.itemName;
  const quantity= req.body.quantity;
  const contactNo= req.body.contactNo;
  const address= req.body.address;
  const status= req.body.status;


  const newdeclineorder = new DeclinedOrder({

      _id,
      itemId,
      itemName,
      quantity,
      contactNo,
      address,
      status
  })

  newdeclineorder.save().then(()=>{
      res.json("Order Declined")
  }).catch((err)=>{
      console.log(err);
  })

})

//Retreve Declineed Order 
router.route("/declinedorders").get((req, res) => {
    DeclinedOrder.find()
        .then((declinedorder) => {
          res.json(declinedorder);
        })
        .catch((err) => {
          console.log(err);
        })
  })

  router.route("/deleteDorder/:id").delete(async (req, res) => {
    let userID = req.params.id;

    await DeclinedOrder.findByIdAndDelete(userID)
      .then(() => {
        res.status(200).send({ status: "Declined Order deleted" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error with delete", error: err.message });
      });
  });

  //router.route("/getDorder/:id").get(async (req, res) => {
    //let userID = req.params.id;
     //await DeclinedOrder.findById(userID)
      //.then((declinedorder) => {
        //res.status(200).send({ status: "Declined Order fetched", declinedorder });
      //})
      //.catch(() => {
       // console.log(err,message);
        //res.status(500).send({ status: "Error with get user", error: err.message });
      //});
  //});

  module.exports = router;