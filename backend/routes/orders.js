const orderRouter = require("express").Router();
let Order = require("../models/Order");

//retrive data from database
orderRouter.route("/").get((req,res)=>{

    Order.find().then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
})

//delete selected row from database
orderRouter.route("/delete/:id").delete(async (req,res)=>{
    let userId = req.params.id; 
    await Order.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Order Deleted"})
  }).catch((err)=>{
     console.log(err.message);
     res.status(500).send({status: "Error with Delete Order", error: err.message});
    })
})

orderRouter.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Order.findById(userId).then((orderc)=>{
        res.status(200).send({status: "Order Fetched", orderc})
    }).catch(()=>{
       console.log(err.message);
       res.status(500).send({status: "Error with get order", error: err.message});
      })
    })

module.exports = orderRouter;