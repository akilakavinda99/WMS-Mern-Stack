import React, { useState, useEffect } from "react";
import axios from "axios";
import './labour.css';
import LabourHeader from "./LabourHeaders/LabourHeader"
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import {useHistory} from 'react-router-dom';


export default function AddLabourers() {

  const { register, handleSubmit, formState: { errors }} = useForm();
    const [name, setName] = useState("");
    const [regNo, setregNo] = useState("");
    const [nicNo, setnicNo] = useState("");
    const [telephoneNo, settelephoneNo] = useState("");
    const [jobType, setjobType] = useState("");
    const [address, setaddress] = useState("");
    const [gender, setgender] = useState("");
    const [Dob, setDob] = useState("");
    const [maritalStatus, setmaritalStatus] = useState("");
    const [basicSal, setbasicSal] = useState("");

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

    function sendData(e){
        //e.preventDefault();
        //alert("insert");
    
        const newLabour={
            name,
            regNo,
            nicNo,
            telephoneNo,
            jobType,
            address,
            gender,
            Dob,
            maritalStatus,
            basicSal
        }
        axios.post("http://localhost:8070/labour/add", newLabour).then(()=> {
         
          swal({
            title: "Success!",
            text: "Labour Successfully Added",
            icon: "success",
            button: "Ok",
          });setTimeout(function(){
            window.location.reload();
           },2500);
        }).catch((err)=>{
          swal("Error occuerd" +err);
        })
    }

    return (
  <div>{supplier.role === "manager"?<>
    <LabourHeader/>
    <div className="left left-labour-add">
      <div className ="addcard">
        <div className="container">

          <center><h2 className="h2-head">Add Labourers</h2></center>

          <form onSubmit={handleSubmit(sendData)}>
            <div className="row g-2">
              <div className="col-md-6">
              <label for="name" className="form-label">Labour Name</label>
              <input type="text" className="form-control" id="name" {...register("labourname", { required:true})} placeholder="Enter Labour Name" onChange= {(e)=> {
                  setName(e.target.value);
              }}/> 
              {errors.labourname && (<p className="requied-warn">*requied labour name</p>)}
              </div>

              <div className="col-md-6">
              <label for="regno" className="form-label">Registration number</label>
              <input type="text" className="form-control" id="regno" {...register("regno", { required:true})} placeholder="Enter Registration number" onChange= {(e)=> {
                  setregNo(e.target.value);
              }}/>
              {errors.regno && (<p className="requied-warn">*requied registration no</p>)}
              </div>
            </div>
            <div className="row g-2">
                <div className="col-md-6">
                <label for="nic" className="form-label">NIC No</label>
                <input type="text" className="form-control" id="nic" {...register("nicno", { required:true})} placeholder="Enter NIC number" onChange= {(e)=> {
                  setnicNo(e.target.value);
                }}/>
                {errors.nicno && (<p className="requied-warn">*requied NIC no</p>)}
                </div>
                
              <div className="col-md-6">
                <label for="tpno" className="form-label">Telephone number</label>
                <input type="text" className="form-control" id="tpno" {...register("contactno", { minLength:10, maxLength:12 })} placeholder="Enter telephone number" onChange= {(e)=> {
                  settelephoneNo(e.target.value);
                }}/>
                {errors?.contactno?.type==="minLength" && (<p className="requied-warn">*contact No must be contain Min 10 numbers</p>)}
                {errors?.contactno?.type==="maxLength" && (<p className="requied-warn">*contact No must be contain Max 12 numbers</p>)}
              </div>
            </div>
            <div className="row g-2">
                <div className="col-md-6">
                <label for="jobtype" className="form-label">Job Type</label>
      
                <select class="form-select" aria-label="Default select example" onChange= {(e)=> {
                  setjobType(e.target.value);}} >
                  <option selected>Select JobType</option>
                  <option>Machine Operator</option>
                  <option>Warehouse Worker</option>
                  <option>Material Handler</option>
                </select>

                </div>
                <div className="col-md-6">
                <label for="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" {...register("address", { required:true})} placeholder="Enter address" onChange= {(e)=> {
                    setaddress(e.target.value);
                  }}/>
                  {errors.address && (<p className="requied-warn">*requied address</p>)}
                </div>
              </div>
              <div className="row g-2">
                <div className="col-md-6">
                  <label for="gender" className="form-label">Gender</label>
                  
                  <select class="form-select" aria-label="Default select example" onChange= {(e)=> {
                    setgender(e.target.value);}} >
                    <option selected>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>

                </div>
                  <div className="col-md-6">
                  <label for="dob" className="form-label">Date of Birth</label>
                  <input type="date" className="form-control" id="dob" onChange= {(e)=> {
                    setDob(e.target.value);
                  }}/>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-md-6">
                  <label for="gender" className="form-label">Marital Status</label>

                  <select class="form-select" aria-label="Default select example" onChange= {(e)=> {
                    setmaritalStatus(e.target.value);}} >
                    <option selected>Select Marital Status</option>
                    <option>Married</option>
                    <option>Unmarried</option>
                  </select>

                  </div>
                  <div className="col-md-6">
                  <label for="gender" className="form-label">Basic Salary</label>
                  <input type="text" className="form-control" id="gender" {...register("basicSal", { required:true})} placeholder="Enter basic salary" onChange= {(e)=> {
                    setbasicSal(e.target.value);
                  }}/>
                  {errors.basicSal && (<p className="requied-warn">*requied basic salary </p>)}
                  </div>
                </div>
                <div className="add-button">
                <center><button type="submit" className="btn btn-success">Add Labour</button></center>
                </div>
          </form>
        </div>
      </div>
    </div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}
  </div>
    )


}   

    




