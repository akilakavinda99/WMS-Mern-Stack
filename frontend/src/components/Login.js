import React,{useState,useContext} from 'react';
import Authantication from '../Services/Authantication';
import './login.css';
import { AuthContext } from '../Context/AuthContext';
import SupplierHeader from './SupHeaders/SupplierHeader';
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Nav from './Nav';
import img from './logo.png';
const eye = <FontAwesomeIcon icon={faEye} />;



const Login = props=>{
  const [user,setUser] = useState({username: "", password: ""});
  // const [message,setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  const onChange = e=>{
    setUser({...user,[e.target.name] : e.target.value});
    console.log(user);
  }


  const onSubmit = e =>{
    e.preventDefault();
    Authantication.login(user).then(data=>{
      const { isAuthenticated,user,message} = data;
      if(isAuthenticated){
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        if(user.role==="agent"){
          props.history.push('/agent/agentprofile');
        }else{
          props.history.push('/supplier/supplierprofile');
        }
      }
      else{
      // setMessage(message);
      swal({title: "Login Failed",
        text: "Incorrect Username Or Password",
        icon: "warning"} );
        }
    });
  }

  return(
    <>
   
      {/* <SupplierHeader/> */}
      {/* <Nav/> */}
      <div className="bodylogin">
    <div className="dloginlft">
      <div className="dlogincard">
    

    <div className="container">
      <br/>
      <div className="row">
        <div className="column column-loginimg">
        <center><img src={img}  width="300" height="210"></img></center>
        </div>
        <div className="column column-hrline">
        <div class="vl"></div>
        </div>
        <div className="column column-loginbody">
      <div className="loginName">
      <center><h2 style={{fontFamily:"Arial,Helvetica,sans-serif", fontWeight:"bold"}}>Login</h2></center>
      </div>
      <div className="dlogincard2" >
        <br/>

        <div className="dlogincard3">
         
     
      <form  onSubmit={onSubmit} className="frm" noValidate>
            <div className="mb-3">
              <label htmlfor="username" className="form-label" style={{fontFamily:"Arial,Helvetica,sans-serif" , fontSize:"18px"}}>Username</label>
              <input type="text"
                      name="username"
                      className="form-control" 
                      placeholder="Enter Username "
                      onChange={onChange} required/>
            </div>

            <div className="pass-wrapper">
            
              <label htmlfor="password" className="form-label" style={{fontFamily:"Arial,Helvetica,sans-serif" , fontSize:"18px"}}>Password</label>
              <div className="input-group mb-3">
              <input type={passwordShown ? "text" : "password"} 
                     name="password" 
                     className="form-control" 
                     id="log" 
                     placeholder="Enter Password"
                     onChange={onChange}required/>
                      <span class="input-group-text" id="basic-addon2"><i className="eye" onClick={togglePasswordVisiblity}>{eye}</i></span>
            </div>
            
            </div>
            <center><button type="submit" 
                    className="btn btn-primary" id="dloginbtn">Login</button></center>

    </form>
    </div>
<br/>
    </div>
    <br/>
    {/* {message ? <SupMessage message={message}/> : null} */}
   </div>
   </div>
   </div>
</div>
</div>
</div>

</>
  )
}


export default Login;