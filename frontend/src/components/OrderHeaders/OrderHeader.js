import React,{useContext} from 'react';
import './OrderHeader.css';
import {OrderData} from './OrderData'
import ReactTypingEffect from 'react-typing-effect'
import Authantication from '../../Services/Authantication';
import {AuthContext} from '../../Context/AuthContext';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';

function OrderHeader(){
  const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);

  let history = useHistory();
  let path = '/supplier/login';
  const authContext = useContext(AuthContext);

  const onClickLogoutHandler = ()=>{ 
    swal({
          title: "Log Out",
          text: "Are you Sure?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
    Authantication.logout().then(data=>{
      if (willDelete) {
      if(data.success){
            setUser(data.user);
            setIsAuthenticated(false);
             history.push(path);
            swal("Successfully Logout", 
              "success",
            );  setTimeout(function(){
              window.location.reload();
             },1000);}

      }})
      
  }
})
  }

return(
  
  //mapping and creating rows
    <div className="PSideBar">
      <ul className="PSideBarList">
      <button className="btn btn-danger" id="Pbutton" onClick={onClickLogoutHandler}>logout</button>
      <div className="Plegal1">
        <ReactTypingEffect
                text={["Order Management"]}/>
            </div>
      {OrderData.map((val,key)=>{
        return(
          <li  className="row"
          //checking the pathname and link and if they are equal then display as selected
          id={window.location.pathname==val.link ? "active":""}
          key={key} onClick={()=>{window.location.pathname=val.link}}>
            <center>
            <div id ="icon">{val.icon}</div>
            <div  id ="title">{val.title}</div>
            </center>
          </li>
          
        );
      })}
      </ul>
      <br></br>
      <br></br>
      <div className="Plegal">
        <ReactTypingEffect
                text={["Copyright ©2021 Ceylon Foods (Pvt) Ltd. All Rights Reserved."]}/>
            </div>
    </div>
     
    )
}
export default OrderHeader;