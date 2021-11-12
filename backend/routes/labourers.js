const router = require("express").Router();
let Labour = require("../models/labour");
let Attendance = require("../models/Attendance");
const { db } = require("../models/labour");

//insert
router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const regNo = req.body.regNo;
    const nicNo = req.body.nicNo;
    const telephoneNo = req.body.telephoneNo;
    const jobType = req.body.jobType;
    const address = req.body.address;
    const gender = req.body.gender;
    const Dob = req.body.Dob;
    const maritalStatus = req.body.maritalStatus;
    const basicSal = req.body.basicSal;

    const newLabour = new Labour({

        name,
        regNo,
        nicNo,
        telephoneNo,
        jobType,
        address,
        gender,
        Dob,
        maritalStatus,
        basicSal
    })

    newLabour.save().then(()=>{
        res.json("new labour Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//read
router.route("/view").get((req,res)=> {

    Labour.find().then((labourers)=>{
        res.json(labourers)
    }).catch((err)=>{
        console.log(err)
    })
})

//update
router.route("/update/:id").put(async (req,res) =>{
    let userId = req.params.id;
    const {name,regNo,nicNo,telephoneNo,jobType,address,gender,Dob,maritalStatus,basicSal} = req.body;

    const updateLabour = {
        name,
        regNo,
        nicNo,
        telephoneNo,
        jobType,
        address,
        gender,
        Dob,
        maritalStatus,
        basicSal
    }

    const update = await Labour.findByIdAndUpdate(userId,updateLabour).then(() =>{
        res.status(200).send({status: "User updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message})
    });
    
})

//delete
router.route("/delete/:id").delete(async(req,res) =>{
    let userId = req.params.id;
    await Labour.findByIdAndDelete(userId).then(() =>{
        res.status(200).send({status: "labour deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete labour", error: err.message});
    });
})

//fetch user data
router.route("/get/:id").get(async(req,res)=>{
    const id = req.params.id;

   await Labour.findById(id).then((labourers)=>{
        res.status(200).send({status:"Labour fetched", labourers});
    
    }).catch((e)=>{
        res.status(500).send({status:"Error"});
    })

})

router.route("/attendance").get((req,res)=> {

    Labour.find().then((labourers)=>{
        res.json(labourers)
        db.collection("attendances").insertMany(labourers)
       
    }).catch((err)=>{
        console.log(err)
    })
})


module.exports = router;