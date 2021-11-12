const supplierRouter = require('express').Router();
const MyOrders = require('../models/PendingSupOrders');
const Supplier = require('../models/Supplier');
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../passport');


supplierRouter.route("/addmyorders").post((req,res)=>{
  const userId = req.body.userId;
  const nicno = req.body.nicno;
  const itemName = req.body.itemName;
  const quantity = req.body.quantity;
  const requestdate = req.body.requestdate;
  const bdate = req.body.bdate;

  const newmyoreders = new MyOrders({
    userId,
    nicno,
    itemName,
    quantity,
    requestdate,
    bdate
  })

  newmyoreders.save().then(()=>{
    res.json("Saved to My orders")
  }).catch((err)=>{
    console.log(err);
  })

})

//Retreve My orders
// supplierRouter.route("/myorders/:userId").get ((req,res)=>{
//   let userId = req.params.userId;
//   MyOrders.find({userId})
//   .then((myorders)=>{
//           res.json(myorders);

//   })
//   .catch((err)=>{
//     console.log(err);
//   })
// });

supplierRouter.get('/myorders',passport.authenticate('jwt',{session : false}),(req,res)=>{
  MyOrders.find({userId : req.user._id})
  .then((myorders)=>{
    res.json(myorders);
  })
  .catch((err)=>{
    console.log(err);
  })

});

supplierRouter.get('/allAorders',passport.authenticate('jwt',{session : false}),(req,res)=>{
  MyOrders.find()
  .then((myorders)=>{
    res.json(myorders);
  })
  .catch((err)=>{
    console.log(err);
  })
});


supplierRouter.route("/deletemyorder/:id").delete(async(req,res)=>{
  let userID = req.params.id;

  await MyOrders.findByIdAndDelete(userID)
  .then(()=>{
    res.status(200).send({ status: "Order deleted" });
  })
  .catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  });
});

supplierRouter.route("/getmyorder/:id").get(async(req,res)=>{
  let userID = req.params.id;
  await MyOrders.findById(userID)
  .then((myorders)=>{
    res.status(200).send({ status:"My Orders Fetched", myorders});
  })
  .catch(()=>{
    console.log(err.message);
    res.status(500).send({ status: "Error with get user", error: err.message });
  });
});

module.exports = supplierRouter;