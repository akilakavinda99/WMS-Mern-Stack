const supplierRouter = require('express').Router();
const NewOrders = require("../models/RequestMaterial");

//retreve order requests
supplierRouter.route("/allneworders").get((req,res)=>{
  NewOrders.find()
  .then((neworders)=>{
      res.json(neworders);
    })
    .catch((err)=>{
      console.log(err);
    })
  })

  //delete new orders
supplierRouter.route("/delerteneworde/:id").delete(async(req,res)=>{
  let userID = req.params.id;

  await NewOrders.findByIdAndDelete(userID)
  .then(()=>{
    res.status(200).send({ status: "New Order deleted" });
  })
  .catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  });
});

supplierRouter.route("/getneworder/:id").get(async(req,res)=>{
  let userID = req.params.id;
  await NewOrders.findById(userID)
  .then((neworders)=>{
    res.status(200).send({ status: "Material Request fetched", neworders });
  })
  .catch(()=>{
    console.log(err,message);
    res.status(500).send({ status: "Error with get user", error: err.message });
  });
});

module.exports = supplierRouter;