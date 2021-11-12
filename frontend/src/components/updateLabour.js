import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams , useHistory} from "react-router-dom"
import LabourHeader from "./LabourHeaders/LabourHeader";
import swal from "sweetalert";



export default function UpdateLabour(){
  


    const {id} = useParams ();

    let history = useHistory();
    let path = `/labour/LabourDetails/${id}`;


    let path1 = '/supplier/login';
    let path2 = '/supplier/supplierprofile';
    let path3 = '/agent/agentprofile';

    const [supplier, setSupplier] = useState([]);

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
    
    const [updateDetails, setupdateDetails] = useState([]);

    useEffect(()=>{
      const fetchUser = async ()=>{
        const res = await axios.get('/supplier/supplierprofile').then((res)=>{
        setSupplier(res.data);
        }).catch(()=>{
          history.push(path1);
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

        axios.get(`http://localhost:8070/labour/get/${id}`).then((res)=>{
            console.log(res.data);

        setupdateDetails(res.data.labourers)

        setName(res.data.labourers.name)
        setregNo(res.data.labourers.regNo)
        setnicNo(res.data.labourers.nicNo)
        settelephoneNo(res.data.labourers.telephoneNo)
        setjobType(res.data.labourers.jobType)
        setaddress(res.data.labourers.address)
        setgender(res.data.labourers.gender)
        setDob(res.data.labourers.Dob)
        setmaritalStatus(res.data.labourers.maritalStatus)
        setbasicSal(res.data.labourers.basicSal)

        }).catch((err) => {
            console.log(err);
            console.log(id);
        })
  },[])

  function updateData(e){
      e.preventDefault();

      const newupdateDetails = {
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

    
    axios.put(`http://localhost:8070/labour/update/${id}`, newupdateDetails).then(()=>{
        // window.location = `/labour/LabourDetails/${id}`

        swal({
          title: "Success!",
          text: "Labour Successfully Updated",
          icon: "success",
          button: "Ok",
        });history.push(path);

        }).catch((err)=>{
          swal("Error occuerd" +err);
        })
        }

    return(

      <div>{supplier.role === "manager"?<>
      <LabourHeader/>
      <div className="lft">
        <div className ="addcard">
          <div className="container">
  
            <center><h2 className="h2-head">Update labour Details</h2></center>
  
            <form>
              <div className="row g-2">
                <div className="col-md-6">
                <label for="name" className="form-label">Labour Name</label>
                <input type="text" className="form-control" id="name" defaultValue={updateDetails.name} onChange= {(e)=> {
                    setName(e.target.value);
                }}/> 
                </div>
  
                <div className="col-md-6">
                <label for="regno" className="form-label">Registration number</label>
                <input type="text" className="form-control" id="regno" defaultValue={updateDetails.regNo} onChange= {(e)=> {
                    setregNo(e.target.value);
                }} readOnly/>
                </div>
              </div>
              <div className="row g-2">
                  <div className="col-md-6">
                  <label for="nic" className="form-label">NIC No</label>
                  <input type="text" className="form-control" id="nic" defaultValue={updateDetails.nicNo} onChange= {(e)=> {
                    setnicNo(e.target.value);
                  }}/>
                  </div>
                  
                <div className="col-md-6">
                  <label for="tpno" className="form-label">Telephone number</label>
                  <input type="text" className="form-control" id="tpno" defaultValue={updateDetails.telephoneNo} onChange= {(e)=> {
                    settelephoneNo(e.target.value);
                  }}/>
                </div>
              </div>
              <div className="row g-2">
                  <div className="col-md-6">
                  <label for="jobtype" className="form-label">Job Type</label>
        
                  <select class="form-select" aria-label="Default select example" onChange= {(e)=> {
                    setjobType(e.target.value);}} >
                    <option selected>{jobType}</option>
                    <option>Machine Operator</option>
                    <option>Warehouse Worker</option>
                    <option>Material Handler</option>
                  </select>
  
                  </div>
                  <div className="col-md-6">
                  <label for="address" className="form-label">Address</label>
                  <input type="text" className="form-control" id="address" defaultValue={updateDetails.address} onChange= {(e)=> {
                      setaddress(e.target.value);
                    }}/>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-md-6">
                    <label for="gender" className="form-label">Gender</label>
                    
                    <select class="form-select" aria-label="Default select example" defaultValue={updateDetails.gender} onChange= {(e)=> {
                      setgender(e.target.value);}} >
                      <option selected>{gender}</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
  
                  </div>
                    <div className="col-md-6">
                    <label for="dob" className="form-label">Date of Birth</label>
                    <input type="date" defaultValue={updateDetails.Dob} className="form-control" id="dob"  onChange= {(e)=> {
                      setDob(e.target.value);
                    }}/>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-md-6">
                    <label for="gender" className="form-label">Marital Status</label>
  
                    <select class="form-select" aria-label="Default select example" defaultValue={updateDetails.maritalStatus} onChange= {(e)=> {
                      setmaritalStatus(e.target.value);}} >
                      <option selected>{maritalStatus}</option>
                      <option>Married</option>
                      <option>Unmarried</option>
                    </select>
  
                    </div>
                    <div className="col-md-6">
                    <label for="gender" className="form-label">Basic Salary</label>
                    <input type="text" className="form-control" id="gender" defaultValue={updateDetails.basicSal} onChange= {(e)=> {
                      setbasicSal(e.target.value);
                    }}/>
                    </div>
                  </div>
                  <div className="add-button">
                  <center><button onClick={updateData} type="submit" className="btn btn-primary">Update</button></center>
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
















