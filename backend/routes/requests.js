const requestRouter = require("express").Router();
let Request = require("../models/Request");

//insert data to database
requestRouter.route("/send").post((req,res)=>{
    
    const itemid = req.body.itemid;
    const itemstatus = req.body.itemstatus;
    const qty = req.body.qty;
    const otime= req.body.otime;
    const odate = req.body.odate;
    const message = req.body.message;

    const newRequest = new Request({

        itemid,
        itemstatus,
        qty,
        otime,
        odate,
        message

    })

    newRequest.save().then(()=>{
        res.json("Request Sent")
    }).catch((err)=>{
        console.log(err);
    })
    
})

module.exports = requestRouter;