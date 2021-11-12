import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import './SupplierProfile.css';
import AdminHeader from './SupHeaders/AdminHeader';
import SupplierHeader2 from './SupHeaders/SupplierHeader2';
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom'
import ManagerHeader from './manager/managerHeader';





const SupplierProfile = props=>{

  let history = useHistory();
  let path = '/supplier/login';


  
  const [supplier, setSupplier] = useState([]);


useEffect(()=>{
  const fetchUser = async ()=>{
    const res = await axios.get('/supplier/supplierprofile').then((res)=>{
    setSupplier(res.data);
    }).catch(()=>{
      history.push(path);
      swal({title: "unauthorized",
      text: "Please Login First",
      icon: "warning"} ); 
  })
}
  fetchUser();
},[]);
  return(
    <>
      
      <div>
      {supplier.role === "admin" ?
      <AdminHeader/>:supplier.role === "manager"?<ManagerHeader/>:supplier.role==="supplier"?<SupplierHeader2/>:<div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
      </div>
    </div>}
    </div> 
    <div >
    <div className="da1lft">
      <div className="da1card">

      <div className="container">

      <h1 style={{fontFamily:"Arial,Helvetica,sans-serif", fontWeight:"bold"}}>Hello, Mr. {supplier.name}... </h1>
      <br/>
      <div>
      <Link to={"/supplier/supplierupdate/" + supplier
      ._id} >
      <button type="button" 
              className="btn btn-outline-success" 
              >Update Profile</button> </Link>
    </div>
    <br/>


            <div className="border border-primary">
              <br/>
               
            <table  className="table" >
              <tbody>
                   <tr>
                     <td>Name</td>
                     <td>{supplier.name}</td>
                     </tr>

                     <tr>
                     <td>Nic No</td>
                     <td>{supplier.nicno}</td>
                     </tr>

                     <tr>
                     <td>Address</td>
                     <td>{supplier.address}</td>
                     </tr>

                     <tr>
                     <td>Contact No</td>
                     <td>{supplier.contactno}</td>
                     </tr>

                     <tr>
                     <td>Company Name</td>
                     <td>{supplier.companyname}</td>
                     </tr>

                     <tr>
                     <td>Raw</td>
                     <td>{supplier.raw}</td>
                     </tr>

                     <tr>
                     <td>Description</td>
                     <td>{supplier.description}</td>
                     </tr>

                     <tr>
                     <td>Email</td>
                     <td>{supplier.email}</td>
                     </tr>

                     <tr>
                     <td>Username</td>
                     <td>{supplier.username}</td>
                     </tr>

                   </tbody>
                   
                </table>
                
                
            </div> 
            
             
            <br/>
    </div>


    </div>
    
    
     
    </div>
    </div>
    </>
  );


}
export default  SupplierProfile;