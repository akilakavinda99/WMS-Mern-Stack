const router = require("express").Router();
let Inbounditem = require("../models/inbound");



router.route("/add").post((req,res)=>{

    const itemName = req.body.itemName;
    const itemID = req.body.itemID;
    const quantity = req.body.quantity;
    const batchNo = req.body.batchNo;
    const receivedTime = req.body.receivedTime;
    const receivedDate = req.body.receivedDate;
    


    const newInboundItem = new Inbounditem({

        itemName,
        itemID,
        quantity,
        batchNo,
        receivedTime,
        receivedDate



    })

    newInboundItem.save().then(()=>{

        res.json("Inbound Item Added")

    }).catch((err)=>{

        console.log(err);
    })

})






router.route("/").get((req,res)=>{

    Inbounditem.find().then((inbounditems)=>{

        res.json(inbounditems)

    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/delete/:id").delete (async (req,res) =>{
    const id = req.params.id;

    try {
        await Inbounditem.findByIdAndRemove(id).exec();
        res.send('Succesfully Deleted')
  
      } catch (error) {
          console.log(error);
          
      }
})

router.route("/get/:id").get(async(req,res)=>{
    const id = req.params.id;

   await Inbounditem.findById(id).then((inbounditems)=>{
        res.status(200).send({status:"supplier fetched", inbounditems});
    
    }).catch((e)=>{
        res.status(500).send({status:"Error"});
    })

})

router.route("/update/:id").put(async (req,res)=>{
    const id = req.params.id;
    const {itemName,
        itemID,
        quantity,
        batchNo,
        receivedTime,
        receivedDate} =req.body;

    const updateInbound ={
        itemName,
        itemID,
        quantity,
        batchNo,
        receivedTime,
        receivedDate
    }

     await Inbounditem.findByIdAndUpdate(id,updateInbound).then(()=>{
        res.status(200).send({status:"supplier updated"});
    }).catch((e)=>{
        res.status(500).send({status:"Error"});
    })

})

module.exports = router;