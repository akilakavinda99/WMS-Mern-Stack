const router = require("express").Router();
let Qualityfaileditem = require("../models/qualityfailed");

router.route("/add").post((req,res)=>{

    const itemName = req.body.itemName;
    const itemID = req.body.itemID;
    const quantity = req.body.quantity;
    const batchNo = req.body.batchNo;
    const description = req.body.description;
  
    


    const newQualityfaileditem = new Qualityfaileditem({

        itemName,
        itemID,
        quantity,
        batchNo,
        
        description



    })

    newQualityfaileditem.save().then(()=>{

        res.json("Qualitypassed Item Added")

    }).catch((err)=>{

        console.log(err);
    })

})

router.route("/").get((req,res)=>{

    Qualityfaileditem.find().then((faileditems)=>{

        res.json(faileditems)

    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/get/:id").get(async(req,res)=>{
    const id = req.params.id;

   await  Qualityfaileditem.findById(id).then((faileditems)=>{
        res.status(200).send({status:"supplier fetched", faileditems});
    
    }).catch((e)=>{
        res.status(500).send({status:"Error"});
    })

})

router.route("/delete/:id").delete (async (req,res) =>{
    const id = req.params.id;

    try {
        await Qualityfaileditem.findByIdAndRemove(id).exec();
        res.send('Succesfully Deleted')
  
      } catch (error) {
          console.log(error);
          
      }
})
module.exports = router;