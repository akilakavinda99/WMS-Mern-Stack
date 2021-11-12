const router = require("express").Router();
let AcceptedOrder = require("../models/AcceptedOrder");

//Accept order
router.route("/accept").post((req,res)=>{

  const _id = req.body._id;
  const itemId = req.body.itemId;
  const itemName= req.body.itemName;
  const quantity= req.body.quantity;
  const contactNo= req.body.contactNo;
  const address= req.body.address;
  const status= req.body.status;


  const newacceptorder = new AcceptedOrder({

      _id,
      itemId,
      itemName,
      quantity,
      contactNo,
      address,
      status
  })

  newacceptorder.save().then(()=>{
      res.json("Order Accepted")
  }).catch((err)=>{
      console.log(err);
  })

})


//Retreve Accepted Order 
router.route("/acceptedorders").get((req, res) => {
    AcceptedOrder.find()
        .then((acceptedorder) => {
          res.json(acceptedorder);
        })
        .catch((err) => {
          console.log(err);
        })
  });

  router.route("/deleteAorder/:id").delete(async (req, res) => {
    let userID = req.params.id;

    await AcceptedOrder.findByIdAndDelete(userID)
      .then(() => {
        res.status(200).send({ status: "Order deleted" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error with delete", error: err.message });
      });
  });

  //router.route("/getAorder/:id").get(async (req, res) => {
    //let userID = req.params.id;
     //await AcceptedOrder.findById(userID)
      //.then((acceptedorder) => {
        //res.status(200).send({ status: "Accepted Order fetched", acceptedorder });
      //})
      //.catch(() => {
        //console.log(err,message);
        //res.status(500).send({ status: "Error with get user", error: err.message });
      //});
  //});

  module.exports = router;