const agentRouter = require('express').Router();
const Agent = require('../Models/Agent');
const Supplier = require('../models/Supplier');
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../passport');
// const passport = require('passport');
// const passportConfig = require('../passport');
// const JWT = require('jsonwebtoken');


// const signToken = userID =>{
//     return JWT.sign({
//         iss : "vinuka",
//         sub : userID
//      //token expires in 1 hour
//     },"vinuka",{expiresIn: "1h"});
// }







// agentRouter.route('/register').post((req,res)=>{
//     const {name,nicno,address,contactno,email,username,password,role} = req.body;

//     //check username exist
//     Agent.findOne({username},(err,user)=>{
//         if(err)
//         res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
//         if(user)
//         res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
//         else{
//             const newAgent = new Agent({name,nicno,address,contactno,email,username,password,role});
//             newAgent.save(err=>{
//                 if(err)
//                 res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
//                 else
//                 res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});

//             });
//         }
//     });
// });
// //use passport locatstrategy for login
// agentRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
//     if(req.isAuthenticated()){
//         //get request user from passport compare password
//         const {_id,username,role} = req.user;
//         //create json token
//         const token =signToken(_id);
//         //set cookie
//         res.cookie('access_token',token,{httpOnly: true,sameSite:true});
//         res.status(200).json({isAuthenticated : true,user : {username,role}});

//     }
// });

// agentRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
//     res.clearCookie('access_token');
//     res.json({user:{username : "", role : ""},success : true});

// });

//user Profile
agentRouter.get('/agentprofile',passport.authenticate('jwt',{session : false}),(req,res)=>{
  Supplier.findById({_id : req.user._id}).then(supplier=>{

    if(!supplier){
        error.nonprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
    }if(supplier){
        res.json(agent);
    }
  })
  .catch(err => res.status(404).json(err));
});

//all agents
agentRouter.route("/allagent").get((req,res)=>{

    Supplier.find().then((agent)=>{
        res.json(agent)
    }).catch((err)=>{
        console.log(err);
    })
    
})


agentRouter.route("/agentupdate/:id").put(async(req,res)=>{
    let userID = req.params.id;

    const{name,nicno,address,contactno,email,username} = req.body;

    const updateAgent = {
        name,
        nicno,
        address,
        contactno,
        email,
        username
    }
    try{
        await Supplier.findByIdAndUpdate(userID,updateAgent).exec();
        res.status(200).send({status:"Agent updated"})
    }
    catch(err){
        res.status(500).send({status:"Error with updating data", error: err.message});
    }
    
})

// const update = await Agent.findByIdAndUpdate(userID, updateAgent)

// .then(() => {

//   res.status(200).send({ status: "Agent updated" });

// })

// .catch((err) => {

//   res

//     .status(500)

//     .send({ status: "Error With updating data", error: err.message });

// });



agentRouter.route("/agentdelete/:id").delete(async(req,res)=>{
    let id = req.params.id;

    try {
        await Supplier.findByIdAndRemove(id).exec();
        res.send('Successfully Dleted')
    } catch (error) {
        console.log(error);
    }
});

agentRouter.get('/agentadmin',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : "You are an admin", msgError : false}});

    }
    else 
    res.status(403).json({message : {msgBody : "You'r not an admin", msgError : true }});

});

agentRouter.get('/agentauthenticated',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {username,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,role}});

});
module.exports = agentRouter;