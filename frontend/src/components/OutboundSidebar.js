import React,{useContext} from 'react';
import './OutboundSidebar.css';
import {OutboundSidebarData} from './OutboundSidebarData'
import ReactTypingEffect from 'react-typing-effect';
import Authantication from '../Services/Authantication';
import {AuthContext} from '../Context/AuthContext';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';

function OutboundSidebar(){

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
    <div className="AmSideBar">
      <ul className="AmSideBarList">
      <button className="btn btn-danger" id="Ambutton" onClick={onClickLogoutHandler}>logout</button>
        <div className="himg">
      <img src="https://i.postimg.cc/C5pQxNFx/Deliver.gif"/></div>
      <div className="h4">
      <ReactTypingEffect
                 text={["Outbound Management"]}/>
      </div>
      {OutboundSidebarData.map((val,key)=>{
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
      <div className="legalq">Copyright ©2021 Ceylon Foods (Pvt) Ltd. All Rights Reserved.</div>
    </div>
     
    )
}
export default OutboundSidebar;