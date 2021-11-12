const addtoreturnRouter = require("express").Router();
let Addtoreturn = require("../models/Addtoreturn");

//insert data to database
addtoreturnRouter.route("/return").post((req,res)=>{
    
    const itemName = req.body.itemName;
    const itemID = req.body.itemID;
    const quantity = req.body.quantity;
    const batchNo = req.body.batchNo;
    const description = req.body.description;
    const address = req.body.address;
    const trackingnumber = req.body.trackingnumber;
    const shippingstatus = req.body.shippingstatus;

    const newAddtoreturn = new Addtoreturn({

        itemName,
        itemID,
        quantity,
        batchNo,
        description,
        address,
        trackingnumber,
        shippingstatus

    })

    newAddtoreturn.save().then(()=>{
        res.json("Return Added")
    }).catch((err)=>{
        console.log(err);
    })
    
})
//retrive data from database
addtoreturnRouter.route("/returnready").get((req,res)=>{

    Addtoreturn.find().then((addtoreturns)=>{
        res.json(addtoreturns)
    }).catch((err)=>{
        console.log(err)
    })
})

//delete selected row from database
addtoreturnRouter.route("/delete/:id").delete(async (req,res)=>{
    let userId = req.params.id; 
    await Addtoreturn.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Addtoreturn Deleted"})
  }).catch((err)=>{
     console.log(err.message);
     res.status(500).send({status: "Error with Delete Addtoreturn", error: err.message});
    })
})


module.exports = addtoreturnRouter;