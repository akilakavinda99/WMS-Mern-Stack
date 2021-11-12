const router = require("express").Router();
const { request } = require("express");
let Present = require("../models/Present");

// router.route("/present").post((res,req)=>{

//     const name = req.body.name;
//     const regNo = req.body.regNo;
//     const nicNo = req.body.nicNo;
//     const jobType = req.body.jobType;
//     const currentDate = req.body.currentDate;

//     const newPresent = new Present({

//         name,
//         regNo,
//         nicNo,
//         jobType,
//         currentDate
//     })

//     newPresent.save().then(()=>{
//         res.json("Attendance marked")
//     }).catch((err)=>{
//         console.log(err);
//     })
// })

router.route("/present").post((req,res)=>{

    const name = req.body.name;
    const regNo = req.body.regNo;
    const nicNo = req.body.nicNo;
    const jobType = req.body.jobType;
    const currentDate = req.body.currentDate;
  
    


    const newPresent = new Present({

        name,
        regNo,
        nicNo,
        jobType,
        
        currentDate



    })

    newPresent.save().then(()=>{

        res.json("mark present")

    }).catch((err)=>{

        console.log(err);
    })

})

//read
router.route("/presentview").get((req,res)=> {

    Present.find().then((labourpresent)=>{
        res.json(labourpresent)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/attendanceview/present/:date").get((req,res)=> {
    let currentDate = req.params.date;
    //const date = req.body.date;
    //const quary = {currentDate:date};
  
      Present.find({currentDate}).then((attendance)=>{
        console.log(attendance)
          res.json(attendance)
      }).catch((err)=>{
          console.log(err)
      })
  })

module.exports = router;