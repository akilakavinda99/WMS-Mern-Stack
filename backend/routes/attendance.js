const router = require("express").Router();
let Attendance = require("../models/Attendance");

router.route("/attendanceview").get((req,res)=> {

    Attendance.find().then((attendance)=>{
      console.log(attendance)
        res.json(attendance)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/attendancedelete/:id").delete(async(req,res)=>{
    let userID = req.params.id;
  
    await Attendance.findByIdAndDelete(userID)
    .then(()=>{
      res.status(200).send({ status: "feild deleted" });
    })
    .catch((err)=>{
      res.status(500).send({ status: "Error with delete", error: err.message });
    });
  });

module.exports = router;