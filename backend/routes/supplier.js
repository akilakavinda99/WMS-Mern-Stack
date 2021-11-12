const supplierRouter = require('express').Router();
const Supplier = require('../models/Supplier');
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../passport');




const signToken = userID => {
    return JWT.sign({
        iss : "damru",
        sub : userID
//token expires in 1hour, after 1h user have to relogin 
    },"damru",{expiresIn: "1h"});
}

supplierRouter.route('/Aregister').post((req,res)=>{
    const {name,nicno,address,contactno,email,username,password,role} = req.body;

    //check username exist
    Supplier.findOne({username},(err,user)=>{
        if(err)
        res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        if(user)
        res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
        else{
            const newSupplier = new Supplier({name,nicno,address,contactno,email,username,password,role});
            newSupplier.save(err=>{
                if(err)
                res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});

            });
        }
    });
});

supplierRouter.route('/register').post((req,res)=>{

    const {name,nicno,address,contactno,companyname,raw,description,email,username,password,role} = req.body;

    //check username
    Supplier.findOne({ username},(err,user)=>{
        if(err)
        res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
       if(user)
       res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
       else{
           const newSupplier = new Supplier({name,nicno,address,contactno,companyname,raw,description,email,username,password,role});
           newSupplier.save(err=>{
               if(err)
               res.status(500).json({message : {msgBody : "Error has occured ", msgError: true}});
               else
               res.status(201).json({message : {msgBody : "Account Successfully created", msgError: false}});

           });
       }  

    });
});   
//use passport locatstrategy for login
supplierRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
        //get request user from passport compare password
       const {_id,username,role} = req.user;
       //create json token
       const token =signToken(_id);
       //set cookie
       //use http only for prevent client edit cookie using java scripts
       //same site use for cross site scripting prevention
       res.cookie('access_token',token,{httpOnly: true, sameSite:true});
       res.status(200).json({isAuthenticated : true,user : {username,role}});
    }
    
});

supplierRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
   res.clearCookie('access_token');
   res.json({user:{username : "", role :""},success : true});    
});


//user Profile
supplierRouter.get('/supplierprofile',passport.authenticate('jwt',{session : false}),(req,res)=>{

   // let userID = req.params.id;
   // const {name,nicno,address,contactno,companyname,raw,description,email,username,password,role} = req.body;

        Supplier.findById({_id : req.user._id}).then(supplier=>{
        
        if(!supplier){
            error.nonprofile = 'There is no profile for this user';
            return res.status(404).json(errors);

        }if(supplier){
        res.json(supplier);
        }
    })
    .catch(err => res.status(404).json(err));  
 });

//all suppliers
supplierRouter.get('/alluser',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.role === 'admin'){
        Supplier.find().then((supplier)=>{
            res.json(supplier)
        }).catch((err)=>{
            console.log(err);
        })
    }
    else
    res.status(403).json({message : {msgBody : "You'r not an admin", msgError : true}});
    
});

//only suppliers
supplierRouter.get('/onlysupplier/:role',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let role = req.params.role;
        if(req.user.role === 'manager'){
        Supplier.find({role})
        .then((supplier)=>{
            res.json(supplier)
        }).catch((err)=>{
            console.log(err);
        })
    }
    else
    res.status(403).json({message : {msgBody : "You'r not an manager", msgError : true}});
    
});



supplierRouter.route("/supplierupdate/:id").put(async(req,res)=>{
    let userID = req.params.id;
    //const supplier = await Supplier.findById(req.user._id);
    //destructor
    const{name,nicno,address,contactno,companyname,raw,description,email,username} = req.body;

    const updateSupplier = {
        name,
        nicno,
        address,
        contactno,
        companyname,
        raw,
        description,
        email,
        username,
    }
    try{
        await Supplier.findByIdAndUpdate(userID,updateSupplier).exec();
        res.status(200).send({status:"Supplier updated"})
    }
    catch(err){
        res.status(500).send({status:"Error with updating data", error: err.message});
    }
    
})


supplierRouter.route("/supplierdelete/:id").delete(async(req,res)=>{
    let id = req.params.id;


    try {
        await Supplier.findByIdAndRemove(id).exec();
        res.send('Succesfully Deleted')
  
      } catch (error) {
          console.log(error);
          
      }
});

supplierRouter.get('/supplieradmin',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
    res.status(403).json({message : {msgBody : "You'r not an admin", msgError : true}});
    
});

supplierRouter.get('/supplierauthenticated',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {username,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,role}});  
});


//important
module.exports = supplierRouter;