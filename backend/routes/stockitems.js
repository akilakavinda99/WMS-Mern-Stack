const router = require("express").Router();
let StockItem = require("../models/StockItem");


router.route("/addSItem").post((req,res)=>{

  const itemId = req.body.itemId;
  const itemName= req.body.itemName;
  const quantity= req.body.quantity;
  const itemDes = req.body.itemDes;

  const newstockitem = new StockItem({

      itemId,
      itemName,
      quantity,
      itemDes
  })

  newstockitem.save().then(()=>{
      res.json("Item Added")
  }).catch((err)=>{
      console.log(err);
  })

})

router.route("/retSItem").get((req, res) => {
    StockItem.find()
        .then((Stockitem) => {
          res.json(Stockitem);
        })
        .catch((err) => {
          console.log(err);
        })
  });

  router.route("/deletSItem:id").delete(async (req, res) => {
    let userID = req.params.id;

    await StockItem.findByIdAndDelete(userID)
      .then(() => {
        res.status(200).send({ status: "Item deleted" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error with delete", error: err.message });
      });
  });

  router.route("/getSItem:id").get(async (req, res) => {
    let userID = req.params.id;
     await StockItem.findById(userID)
      .then((acceptedorder) => {
        res.status(200).send({ status: "Item fetched", acceptedorder });
      })
      .catch(() => {
        console.log(err,message);
        res.status(500).send({ status: "Error with get user", error: err.message });
      });
  });

  
  module.exports = router;