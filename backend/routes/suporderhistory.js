const supplierRouter = require('express').Router();
const SupOrderHistory = require('../models/SupOrderHistory');
const Supplier = require('../models/Supplier');
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../passport');

supplierRouter.route("/addorderhistory").post((req,res)=>{
  const userId = req.body.userId;
  const nicno = req.body.nicno;
  const itemName = req.body.itemName;
  const quantity = req.body.quantity;
  const requestdate = req.body.requestdate;
  const bdate = req.body.bdate;

  const neworderhistory = new SupOrderHistory({
    userId,
    nicno,
    itemName,
    quantity,
    requestdate,
    bdate
  })

  neworderhistory.save().then(()=>{
    res.json("Saved to order history")
  }).catch((err)=>{
    console.log(err);
  })

})

//Retreve orders history
// supplierRouter.get('/orderhistory/:userId',passport.authenticate('jwt',{session:false}),(req,res)=>{
//   if(req.user.role === 'user'){
//     let userId = req.params.userId;
//     SupOrderHistory.find({userId})
//     .then((suporderhistory)=>{
//             res.json(suporderhistory);
  
//     })
//     .catch((err)=>{
//       console.log(err);
//     })
//   } else
//   res.status(403).json({message : {msgBody : "You'r not an supplier", msgError : true}});

// });

supplierRouter.get('/orderhistory',passport.authenticate('jwt',{session : false}),(req,res)=>{
  SupOrderHistory.find({userId : req.user._id})
  .then((suporderhistory)=>{
    res.json(suporderhistory);
  })
  .catch((err)=>{
    console.log(err);
  })

});

supplierRouter.route("/deleteorderhistory/:id").delete(async(req,res)=>{
  let userID = req.params.id;

  await SupOrderHistory.findByIdAndDelete(userID)
  .then(()=>{
    res.status(200).send({ status: "Order deleted" });
  })
  .catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  });
});

supplierRouter.route("/getorderhistory/:id").get(async(req,res)=>{
  let userID = req.params.id;
  await SupOrderHistory.findById(userID)
  .then((myorders)=>{
    res.status(200).send({ status:"My Orders Fetched", myorders});
  })
  .catch(()=>{
    console.log(err.message);
    res.status(500).send({ status: "Error with get user", error: err.message });
  });
});

module.exports=supplierRouter;


