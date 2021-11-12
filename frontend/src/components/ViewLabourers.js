import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import LabourHeader from "./LabourHeaders/LabourHeader";
import swal from 'sweetalert';
import './viewLabourers.css'
import jspdf from 'jspdf'
import "jspdf-autotable"
import img from './logo.png';
import {useHistory} from 'react-router-dom';


export default function AllLabourers(){

  let history = useHistory();
  let path = '/supplier/login';
  let path2 = '/supplier/supplierprofile';
  let path3 = '/agent/agentprofile';

  const [supplier, setSupplier] = useState([]);
    const [labourers, setLabourers] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");

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

    useEffect(()=> {
        function getLabourers(){
            axios.get("http://localhost:8070/labour/view").then((res)=>{
                setLabourers(res.data);
            }).catch((err)=> {
                alert(err.message);
            })
        }
        getLabourers();
    }, [])

    const deletelabour = (id) =>{

      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this labour details!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
          if(willDelete){
    axios.delete(`http://localhost:8070/labour/delete/${id}`).then(()=>{
       
    
            if (willDelete) {
              swal("Poof! Labour record has been deleted!", {
                icon: "success",
              });setTimeout(function(){
                            window.location.reload();
                           },1000);}
            
          }).catch((e) => {
            swal("File Is Not Deleted");
        })
    }
  })
}
//generate PDF
const generatePDF = tickets => {

  const doc = new jspdf();
  const tableColumn = ["Name", "Reg No", "NIC", "Job Type"];
  const tableRows = [];
  

  tickets.map(ticket => {
      const ticketData = [
          ticket.name,
          ticket.regNo,
          ticket.nicNo,
          ticket.jobType      
      ];
      tableRows.push(ticketData);
  })
  doc.text("All Labours Report", 14, 15).setFontSize(12);
  const date = Date().split(" ");
  const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    


  // right down width height
  doc.addImage(img, 'JPEG', 170, 8, 25, 15);
  doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
  doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
  doc.save(`Labour_report_.pdf`);
  
};

    return(
<div>{supplier.role === "manager"?<>
  <LabourHeader/>
      <div className="head">
        <div className="left left-labour-view">
          <div className="card-view">
            <div className="container">
              <div>
                <center><h2 className="title">Labour List</h2></center>
                <div class="row">
                    <div class="column column-add-labour">
                      <label>Add new labour</label>
                    </div>                                 
                    <div class="column coloumn-button">
                      {<Link to={"/labour/add"} ><button className="btn btn-outline-success addnew">Add</button></Link>}
                    </div>
                    <div class="column column-report">
                    <button type="button" className="btn btn-outline-info" onClick={() => generatePDF(labourers)}>GenerateReport</button>
                    </div>
                </div>

                {/* <i className="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i> */}
                <input class="form-control form-control-searchbar" type="text" placeholder="Search Labourers" aria-label="Search"        
                  onChange={(e) => {
                    setsearchTerm(e.target.value)
                }}/>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Reg No</th>
                  <th scope="col">NIC</th>
                  <th scope="col">Job Type</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
  <tbody>
      {labourers.filter(val=>{
        if (searchTerm === ''){
            return val;
        } else if(
            val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.nicNo.toLowerCase().includes(searchTerm.toLowerCase())
        ){
            return val;
        }
    }).map(function (f){

   return <tr>
      
      <td className="table-data-text">{f.name}</td>
      <td className="table-data-text">{f.regNo}</td>
      <td className="table-data-text">{f.nicNo}</td>
      <td className="table-data-text">{f.jobType}</td>
      

      <td>{<center><Link to={"/labour/LabourDetails/" + f._id} ><button class="btn btn-outline-success">View</button>
                                        </Link></center> }
      </td>
      <td>
      {<center><button onClick={() =>  deletelabour(f._id)} type="button" class="btn btn-outline-danger">Delete</button></center>}
      </td>
    </tr>
      })
    }
  </tbody>
</table>
        </div>
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