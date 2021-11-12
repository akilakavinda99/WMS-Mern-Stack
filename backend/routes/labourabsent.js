const router = require("express").Router();
let Absent = require("../models/Absent");

// router.route("/absent").post((res,req)=>{

//     const name = req.body.name;
//     const regNo = req.body.regNo;
//     const nicNo = req.body.nicNo;
//     const jobType = req.body.jobType;
//     const currentDate = req.body.currentDate;

//     const newAbsent = new Absent({

//         name,
//         regNo,
//         nicNo,
//         jobType,
//         currentDate
//     })

//     newAbsent.save().then(()=>{
//         res.json("Attendance marked")
//     }).catch((err)=>{
//         console.log(err);
//     })
// })

router.route("/absent").post((req,res)=>{

    const name = req.body.name;
    const regNo = req.body.regNo;
    const nicNo = req.body.nicNo;
    const jobType = req.body.jobType;
    const currentDate = req.body.currentDate;
  
    


    const newAbsent = new Absent({

        name,
        regNo,
        nicNo,
        jobType,
        
        currentDate



    })

    newAbsent.save().then(()=>{

        res.json("mark absent")

    }).catch((err)=>{

        console.log(err);
    })

})

//read
router.route("/absentview").get((req,res)=> {

    Present.find().then((labourabsent)=>{
        res.json(labourabsent)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/attendanceview/absent/:date").get((req,res)=> {
    let currentDate = req.params.date;
    //const date = req.body.date;
    //const quary = {currentDate:date};
  
      Absent.find({currentDate}).then((attendance)=>{
        console.log(attendance)
          res.json(attendance)
      }).catch((err)=>{
          console.log(err)
      })
  })

module.exports = router;