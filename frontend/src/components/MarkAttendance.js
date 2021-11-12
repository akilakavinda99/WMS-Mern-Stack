import React,{ useState, useEffect } from "react";
import axios from "axios";
import LabourHeader from "./LabourHeaders/LabourHeader";
import { useParams } from "react-router";
import './CheckAttendance.css'
import {useHistory} from 'react-router-dom';
import swal from "sweetalert";

export default function CheckAttendance(){

    const {id} = useParams();

    const [name, setName] = useState("");
    const [regNo, setregNo] = useState("");
    const [nicNo, setnicNo] = useState("");
    const [jobType, setjobType] = useState("");
    const [currentDate, setcurrentDate] = useState("");

    const [labourers, setAttendanceCheck] = useState("");

    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/supplier/supplierprofile';
    let path3 = '/agent/agentprofile';
    let path4 = '/labour/attendance';

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


    useEffect (()=> {
        axios.get(`http://localhost:8070/labour/get/${id}`).then((res)=>{

            setAttendanceCheck(res.data.labourers)

            setName(res.data.labourers.name)
            setregNo(res.data.labourers.regNo)
            setnicNo(res.data.labourers.nicNo)
            setjobType(res.data.labourers.jobType)
            
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    function present(e){
        //e.preventDefault();
        

        const presentDetails = {
            name,
            regNo,
            nicNo,
            jobType,
            currentDate
        }

        axios.post("http://localhost:8070/labour/present", presentDetails).then(()=>{
            //alert("success");
            history.push(path4);

        }).catch((e)=>{
            alert("error"+e);
        })
        axios.delete(`http://localhost:8070/labour/attendancedelete/${id}`,presentDetails)
    }

    function  absent(e){
        //e.preventDefault();

        const absentDetails = {
            name,
            regNo,
            nicNo,
            jobType,
            currentDate
        }

        axios.post("http://localhost:8070/labour/absent", absentDetails).then(()=>{
          history.push(path4);
            //alert("success");

        }).catch((e)=>{
            alert("error"+e);
        })
        axios.delete(`http://localhost:8070/labour/attendancedelete/${id}`,absentDetails)
    }

    return (
        <div>{supplier.role === "manager"?<>
      <LabourHeader/>
      <div className="lft">
        <div className ="addcard card-check-attendance">
          <div className="container">
          <center><h2>Mark Attendance</h2></center>
  
            <form>

                <label for="name" className="form-label">Labour Name</label>
                <input type="text" className="form-control" id="name" defaultValue={labourers.name} onChange= {(e)=> {
                      setName(e.target.value);
                      }} readOnly/> 

                <label for="regno" className="form-label">Registration number</label>
                <input type="text" className="form-control" id="regno" defaultValue={labourers.regNo} onChange= {(e)=> {
                      setregNo(e.target.value);}}
                      readOnly/>

                  <label for="nic" className="form-label">NIC No</label>
                  <input type="text" className="form-control" id="nic" defaultValue={labourers.nicNo} onChange= {(e)=> {
                      setnicNo(e.target.value);}}
                      readOnly/>
              
                  <label for="jobtype" className="form-label">Job Type</label>     
                  <input type="text" className="form-control" id="jobtype" defaultValue={labourers.jobType} onChange= {(e)=> {
                      setjobType(e.target.value);}}
                      readOnly/>

                  <label for="nic" className="form-label">Date</label>
                  <input type="date" className="form-control" id="dob"  onChange= {(e)=> {
                      setcurrentDate(e.target.value);
                    }}/>

                <div class="row button-row">
                    <div class="column column-button-present">
                      <button type="button" onClick={ ()=> present() } className="btn btn-outline-success present">Present</button>
                    </div>                                 
                    <div class="column coloumn-button-absent">
                      <button type="button" onClick={ ()=> absent() } className="btn btn-outline-danger absent">Absent</button>
                    </div>
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



                