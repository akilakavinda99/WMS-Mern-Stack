const router = require("express").Router();
let Returnitems = require("../models/returnItems");

router.route("/add").post((req,res)=>{

    const itemName = req.body.itemName;
    const itemID = req.body.itemID;
    const quantity = req.body.quantity;
    const batchNo = req.body.batchNo;
    const description = req.body.description;
    const  address = req.body.address;
  
    


    const newReturnitems = new Returnitems({

        itemName,
        itemID,
        quantity,
        batchNo,
        description,
        address



    })

    newReturnitems.save().then(()=>{

        res.json("Qualitypassed Item Added")

    }).catch((err)=>{

        console.log(err);
    })

})


router.route("/").get((req,res)=>{

    Returnitems.find().then((returnitems)=>{

        res.json(returnitems)

    }).catch((err)=>{
        console.log(err)
    })
})

//delete selected row from database
router.route("/delete/:id").delete(async (req,res)=>{
    let userId = req.params.id; 
    await Returnitems.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Package Deleted"})
  }).catch((err)=>{
     console.log(err.message);
     res.status(500).send({status: "Error with Delete Package", error: err.message});
    })
})

router.route("/getr/:id").get(async(req,res)=>{
    const id = req.params.id;

   await   Returnitems.findById(id).then((returnitems)=>{
        res.status(200).send({status:"supplier fetched", returnitems});
    
    }).catch((e)=>{
        res.status(500).send({status:"Error"});
    })

})


module.exports = router;

