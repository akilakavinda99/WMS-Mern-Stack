import React,{useContext} from 'react';
import './Header.css';
import {HeaderData} from './HeaderData';
import Authantication from '../../Services/Authantication';
import {AuthContext} from '../../Context/AuthContext';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';


function SupplierHeader2(){
  const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);


  let history = useHistory();
  let path = '/supplier/login';
  const authContext = useContext(AuthContext);

  const onClickLogoutHandler = ()=>{
    Authantication.logout().then(data=>{
      
      if(data.success){
        swal({
          title: "Log Out",
          text: "Are you Sure?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            setUser(data.user);
            setIsAuthenticated(false);
             history.push(path);
            swal("Successfully Logout", 
              "success",
            );  setTimeout(function(){
              window.location.reload();
             },1000);}
          // } else {
          //   swal("File Is Not Deleted");}

      })
      }
  })
}


return(
  //mapping and creating rows
    <div className="daSideBar">
      <ul className="daSideBarList">
        <button className="btn btn-danger" id="dabutton" onClick={onClickLogoutHandler}>logout</button>
      {HeaderData.map((val,key)=>{
      return(
      <li  className="row"
      //checking the pathname and link and if they are equal then display as selected
      id={window.location.pathname==val.link ? "active":""}
      key={key} onClick={()=>{window.location.pathname=val.link}}>
        
        <div id ="icon">{val.icon}</div>
        <div id ="title">{val.title}</div>
      
      </li>
    );
  })}
      </ul>
    </div>

     
    )
}
export default SupplierHeader2;