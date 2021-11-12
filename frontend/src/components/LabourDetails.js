import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import LabourHeader from "./LabourHeaders/LabourHeader"
import { useParams } from 'react-router-dom';
import './labourDetails.css';
import {useHistory} from 'react-router-dom';
import swal from "sweetalert";

export default function LabourDetails() {
    const[name, setName]=useState([]);

    const { id } = useParams();
    const [labourers, setLabour] = useState([]);

    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/supplier/supplierprofile';
    let path3 = '/agent/agentprofile';

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
    },[])

    function myFunction(){
      history.push(path2);
        swal({title: "unauthorized",
        text: "Your not an manager",
        icon: "warning"} ); 
    }
  
    function myFunction2(){
      history.push(path3);
        swal({title: "unauthorized",
        text: "Your not an manager",
        icon: "warning"} ); 
    }

    useEffect(()=>{
       axios.get(`http://localhost:8070/labour/get/${id}`).then((res) => {
           
                 setLabour(res.data.labourers);
                 setName(res.data.labourers.name)
                //  console.log(res.data);
               
           
        }).catch((e) => {
            console.log(e);
        })
   
    
    },[])

    return(
        <div>{supplier.role === "manager"?<>
            <LabourHeader/>
            <div className="lft">
        <div className ="card-view">
        <div className="container">

        <center><h2 className="title">Labour profile</h2></center>

            <table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <td scope="row">{labourers.name}</td>
    </tr>
    <tr>
      <th scope="col">Registration No</th>
      <td scope="row">{labourers.regNo}</td>
    </tr>
    <tr>
      <th scope="col">NIC No</th>
      <td scope="row">{labourers.nicNo}</td>
    </tr>
    <tr>
      <th scope="col">Telephone</th>
      <td scope="row">{labourers.telephoneNo}</td>
    </tr>
    <tr>
      <th scope="col">Job Type</th>
      <td scope="row">{labourers.jobType}</td>
    </tr>
    <tr>
      <th scope="col">Address</th>
      <td scope="row">{labourers.address}</td>
    </tr>
    <tr>
      <th scope="col">Gender</th>
      <td scope="row">{labourers.gender}</td>
    </tr>
    <tr>
      <th scope="col">Date of Birth</th>
      <td scope="row">{labourers.Dob}</td>
    </tr>
    <tr>
      <th scope="col">Marital Status</th>
      <td scope="row">{labourers.maritalStatus}</td>
    </tr>
    <tr>
      <th scope="col">Basic Salary</th>
      <td scope="row">{labourers.basicSal}</td>
    </tr>
  </thead>
  </table>
      
  <Link to={"/labour/updatelabour/" + labourers._id} ><center><button class="btn btn-primary">Update Details</button></center>
                                        </Link>                            
        </div>
        </div>
        </div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}
        </div>
    )
}
      