const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const Supplier = require('./models/Supplier');

const cookieExtractor = req =>{
  let token = null;
  if(req && req.cookies){
    token = req.cookies["access_token"];
  }
  return token;
}

//authorization
passport.use(new JwtStrategy({
  jwtFromRequest : cookieExtractor,
  secretOrKey : "damru"
},(payload,done)=>{
  Supplier.findById({_id : payload.sub},(err,user)=>{
    if(err)
      return done(err,false);
    if(user)
      return done(null,user);  
    else
      return done(null,false);  
  });
}));

//authentication local strategy using username and password
passport.use(new LocalStrategy((username,password,done)=>{

  Supplier.findOne({username},(err,user)=>{
    // something went wrong with database
    if(err)
      return done(err);
    if(!user)
    //if no user exit
      return done(null,false);  
      //check password is correct
      
      user.comparePassword(password,done);   

  });

}));
