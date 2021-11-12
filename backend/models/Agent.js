const mongoose = require('mongoose');
//use for encrypt password
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const agentSchema = new Schema({

name: {
    type : String,
    required: true
},
nicno: {
    type : String,
    required: true
},
address: {
    type : String,
    required: true
},
contactno: {
    type : String,
    required: true
},
email: {
    type : String,
    required: true
},
username: {
    type : String,
    required: true,
    min : 6,
    max : 15
},
password: {
    type : String,
    required: true
},
role: {
    type : String,
    enum : ['user' , 'admin'],
    required: true,
}

});

//check password is dcrypted before save
agentSchema.pre('save', function(next){
    if(!this.isModified('password'))
      return next();

    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
          return next(err);
        this.password = passwordHash;
        next();
    });
});

agentSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
          return cb(err);
        else{
            if(!isMatch)
              return cb(null,isMatch);

            return cb(null,this);
        }
    });
}

const Agent = mongoose.model("Agent",agentSchema);

module.exports = Agent;