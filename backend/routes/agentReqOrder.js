const router = require('express').Router();
const ReqOrder = require('../models/OrderRequest');


// router.route("/add").post((req, res) => {
//     const itemid = req.body.itemid;
//     const itemname = req.body.itemname;
//     const qty = req.body.qty;
//     const contactnumber = req.body.contactnumber;
//     const address = req.body.address

  
//     const newRequest = new Request({
//       itemid,
//       itemname,
//       qty,
//       contactnumber,
//       address
      
//     });
  
//     newRequest
//       .save()
//       .then(() => {
//         res.json("Item Added");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
  

router.route("/add").post((req,res)=>{


   const _id = req.body._id;
  const itemId = req.body.itemId;

  const itemName = req.body.itemName;
  const quantity = req.body.quantity;
  const contactNo = req.body.contactNo;
  const address = req.body.address;

  const neworderrequest = new ReqOrder({


      _id,
      itemId,

      itemName,
      quantity,
      contactNo,
      address
  })

  neworderrequest.save().then(()=>{
      res.json("Order Requested")
  }).catch((err)=>{
      console.log(err);
  })

})


//Retreve Order Requests
router.route("/orderreq").get((req, res) => {
  ReqOrder.find()
      .then((orderrequests) => {
        res.json(orderrequests);
      })
      .catch((err) => {
        console.log(err);
      })
})


router.route("/deleteorder/:id").delete(async (req, res) => {
  let userID = req.params.id;

  await ReqOrder.findByIdAndDelete(userID)
    .then(() => {
      res.status(200).send({ status: "Order deleted" });
    })
    .catch((err) => {
      res.status(500).send({ status: "Error with delete", error: err.message });
    });
});

router.route("/getorder/:id").get(async (req, res) => {
  let userID = req.params.id;
   await ReqOrder.findById(userID)
    .then((orderrequest) => {
      res.status(200).send({ status: "Material Request fetched", orderrequest });
    })
    .catch(() => {
      console.log(err,message);
      res.status(500).send({ status: "Error with get user", error: err.message });
    });
});

module.exports = router;