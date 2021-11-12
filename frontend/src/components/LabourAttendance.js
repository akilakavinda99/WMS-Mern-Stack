import React, { useState, useEffect } from "react";
import axios from "axios";
import LabourHeader from "./LabourHeaders/LabourHeader"
import './Attendance.css'
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import swal from "sweetalert";




export default function MarkAttendance(){

    const [labDetails, setLabDetails] = useState([]);
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
      function getDetails(){
        axios.get("http://localhost:8070/labour/attendanceview").then((res) => {
            setLabDetails(res.data);
            //console.log(res.data)
        }).catch((e)=>{
            console.log(e);
        })
      }
      getDetails();
    },[])

    function viewLabourers(){
      axios.get("http://localhost:8070/labour/attendance").then((res) => {
            setLabDetails(res.data);
            //console.log(res.data)
        }).catch((e)=>{
            console.log(e);
        })
    }
  
    return(
        <div>{supplier.role === "manager"?<>
        <LabourHeader/>
        
        <div className="head">
        <div className="left left-labour-view">
          <div className="card-view">
            <div className="container">
        <div>
            <center><h2 className="title">Labour Attendance</h2></center>
        </div>

        <div class="row">
                    <div class="column column-view-labour">
                    <button onClick={() =>  viewLabourers()} type="button" className="btn btn-outline-success addnew">view all Labourers</button>
                    </div>                                 
                    
                <div class="column column-report-attendance">
                  <Link to={"/labour/atandancereport"}><button type="button" className="btn btn-outline-info" >Attendance report</button></Link>
                </div>
          </div>

          {/* <button onClick={() =>  viewLabourers()} type="button" class="btn btn-success btn-view">view all Labourers</button> */}
              
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="table-head-align" scope="col">Name</th>               
                  <th className="table-head-align" scope="col">Reg No</th>                 
                  <th className="table-head-align" scope="col">Job Type</th>
                  <th className="table-head-align" scope="col">Attendance</th>
                </tr>
              </thead>
  <tbody>
    {
    labDetails.map(function (details){

      return <tr>
      
      <td className="table-data-text">{details.name}</td>
      <td className="table-data-text">{details.regNo}</td>
      <td className="table-data-text">{details.jobType}</td>

      <td>{<center><Link to={"/labour/markAttendance/" + details._id} ><button class="btn btn-outline-success">Mark</button>
                                        </Link></center> }
      </td>

    </tr>
    })
  }
  </tbody>
</table>
        </div>
        </div>
        </div>
        </div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}
        </div>
        
        
        
    )

}


    


    