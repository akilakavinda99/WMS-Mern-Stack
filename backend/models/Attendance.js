const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({

    name : {
        type : String,
        required: true
    },
    regNo:{
        type: String,
        required: true
    },
    nicNo:{
        type: String,
        required: true
    },
    telephoneNo:{
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },gender: {
        type: String,
        required: true
    },
    Dob: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    basicSal: {
        type: String,
        required: true
    }
})

const Attendance = mongoose.model("attendance",AttendanceSchema);

module.exports = Attendance;