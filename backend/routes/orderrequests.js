const router = require("express").Router();
let OrderRequest = require("../models/OrderRequest");
const Supplier = require('../models/Supplier');
const JWT = require('jsonwebtoken');
const passport = require('passport');

//Request Material
router.post('/reqorder',passport.authenticate('jwt',{session:false}),(req,res)=>{
  if(req.user.role === 'manager'){
    const _id = req.body._id;
    const itemId = req.body.itemId;
    const itemName = req.body.itemName;
    const quantity = req.body.quantity;
    const contactNo = req.body.contactNo;
    const address = req.body.address;

    const neworderrequest = new OrderRequest({

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
  }else{
    res.status(403).json({message : {msgBody : "You'r not an manager", msgError : true}});
  }
})


//Retreve Order Requests
router.get('/orderreq',passport.authenticate('jwt',{session:false}),(req, res) => {
  if(req.user.role ==='manager'){
    OrderRequest.find()
        .then((orderrequests) => {
          res.json(orderrequests);
        })
        .catch((err) => {
          console.log(err);
        })
  }else{
    res.status(403).json({message : {msgBody : "You'r not an manager", msgError : true}});
  }

    
  })


  router.route("/deleteorder/:id").delete(async (req, res) => {
    let userID = req.params.id;

    await OrderRequest.findByIdAndDelete(userID)
      .then(() => {
        res.status(200).send({ status: "Order deleted" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error with delete", error: err.message });
      });
  });


  router.route("/getorder/:id").get(async (req, res) => {
    let userID = req.params.id;
     await OrderRequest.findById(userID)
      .then((orderrequest) => {
        res.status(200).send({ status: "Material Request fetched", orderrequest });
      })
      .catch(() => {
        console.log(err,message);
        res.status(500).send({ status: "Error with get user", error: err.message });
      });
  });

  module.exports = router;