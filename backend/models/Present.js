const mongoose = require('mongoose');
const scheema = mongoose.Schema;

const PresentScheema = new mongoose.Schema({

    name: {
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
    jobType: {
        type: String,
        required: true
    },
    currentDate:{
        type:String,
        required:true
    }
})

const checkPresent = mongoose.model("present",PresentScheema);

module.exports = checkPresent;