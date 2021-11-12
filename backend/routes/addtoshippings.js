const addtoshippingRouter = require("express").Router();
let Addtoshipping = require("../models/Addtoshipping");

//insert data to database
addtoshippingRouter.route("/shipping").post((req,res)=>{
    
    const _id = req.body._id;
    const itemId = req.body.itemId;
    const itemName = req.body.itemName;
    const address = req.body.address;
    const contactNo = req.body.contactNo;
    const quantity = req.body.quantity;
    const trackingnumber = req.body.trackingnumber;
    const shippingstatus = req.body.shippingstatus;

    const newAddtoshipping = new Addtoshipping({

        _id,
        itemId,
        itemName,
        address,
        contactNo,
        quantity,
        trackingnumber,
        shippingstatus

    })

    newAddtoshipping.save().then(()=>{
        res.json("Shipping Added")
    }).catch((err)=>{
        console.log(err);
    })
    
})
//retrive data from database
addtoshippingRouter.route("/readyship").get((req,res)=>{

    Addtoshipping.find().then((addtoshippings)=>{
        res.json(addtoshippings)
    }).catch((err)=>{
        console.log(err)
    })
})

//delete selected row from database
addtoshippingRouter.route("/delete/:id").delete(async (req,res)=>{
    let userId = req.params.id; 
    await Addtoshipping.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Addtoshipping Deleted"})
  }).catch((err)=>{
     console.log(err.message);
     res.status(500).send({status: "Error with Delete Addtoshipping", error: err.message});
    })
})

addtoshippingRouter.route("/update/:id").put(async (req, res)=>{
    let userId = req.params.id; 
    const {_id,itemId, itemName, address, contactNo, quantity,trackingnumber,shippingstatus} = req.body;

    const updateAddtoshipping = {
        _id,
        itemId,
        itemName,
        address,
        contactNo,
        quantity,
        trackingnumber,
        shippingstatus
  }

  const update = await Addtoshipping.findByIdAndUpdate(userId, updateAddtoshipping).then(()=>{

    res.status(200).send({status: "Order Updated"})
  }).catch((err)=>{
     console.log(err);
     res.status(500).send({status: "Error with Updating Data", error: err.message}); 
  })
})

addtoshippingRouter.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Addtoshipping.findById(userId).then((orderf)=>{
        res.status(200).send({status: "Order Fetched", orderf})
    }).catch(()=>{
       console.log(err.message);
       res.status(500).send({status: "Error with get order", error: err.message});
      })
    })

module.exports = addtoshippingRouter;