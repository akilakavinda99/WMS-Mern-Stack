import React, { useState, useEffect } from "react";
import axios from "axios";
import LabourHeader from "./LabourHeaders/LabourHeader"
import jspdf from "jspdf";
import "jspdf-autotable"
import img from './logo.png';
import './LabourSal.css'
import {useHistory} from 'react-router-dom';
import swal from "sweetalert";


export default function SalaryReport(){

    const[salaryDetails, setSalDetails] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");
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

    useEffect(() => {
        function getDetailsSal(){
            axios.get("http://localhost:8070/labour/view").then((res) => {
                setSalDetails(res.data);
            }).catch((e) => {
                console.log(e);
            })
        }
        getDetailsSal();
    },[])

    //generate PDF
const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Name", "Reg No", "NIC", "Job Type", "Salary"];
    const tableRows = [];
    
  
    tickets.map(ticket => {
        const ticketData = [
            ticket.name,
            ticket.regNo,
            ticket.nicNo,
            ticket.jobType,
            ticket.basicSal     
        ];
        tableRows.push(ticketData);
    })
    doc.text("Labourers salary report", 14, 15).setFontSize(12);
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];
      
  
  
    // right down width height
    doc.addImage(img, 'JPEG', 170, 8, 25, 15);
    doc.autoTable(tableColumn, tableRows,  { styles: { fontSize: 8, }, startY: 35, theme:'grid' });
    
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    doc.save(`Labour_Slary_report_.pdf`);

    
  };

    return (
        <div>{supplier.role === "manager"?<>
        <LabourHeader/>
        
        <div className="head">
        <div className="left left-labour-view">
          <div className="card-view">
            <div className="container">
        <div>
            <center><h2 className="title">Labour Salary Management</h2></center>
        </div>
        <button type="button" className="btn btn-outline-info salary-generate" onClick={() => generatePDF(salaryDetails)}>Salaray Report</button>

        {/* <i className="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i> */}
        <input class="form-control form-control-searchbar" type="text" placeholder="Search Labourers" aria-label="Search"        
                  onChange={(e) => {
                    setsearchTerm(e.target.value)
                }}/>
          
            
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="table-head-align" scope="col">Name</th>               
                  <th className="table-head-align" scope="col">Reg No</th>
                  <th className="table-head-align" scope="col">NIC No</th>                 
                  <th className="table-head-align" scope="col">Job Type</th>
                  <th className="table-head-align" colspan="2">Salary</th>
                </tr>
              </thead>
  <tbody>
  {salaryDetails.filter(val=>{
        if (searchTerm === ''){
            return val;
        } else if(
            val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.nicNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.basicSal.toLowerCase().includes(searchTerm.toLowerCase())
        ){
            return val;
        }
    }).map(function (s){

            return <tr>
                <td className="table-data-text">{s.name}</td>
                <td className="table-data-text">{s.regNo}</td>
                <td className="table-data-text">{s.nicNo}</td>
                <td className="table-data-text">{s.jobType}</td>
                <td className="table-data-text">{s.basicSal}</td>
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