import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './AllSupplier.css';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import jspdf from 'jspdf'
import "jspdf-autotable"
import img from '../components/SupAssets/logo.png';
import RefreshIcon from '@material-ui/icons/Refresh';
import ManagerHeader from './manager/managerHeader';

export default function Allsupplier(){
    //from react router dom
    let history = useHistory();
    //path used for unauhorize
    let path = '/supplier/supplierprofile';
    //difine search
    const [searchTerm, setsearchTerm] = useState("");
    //difine supplier
    const [supplier, setSupplier] = useState([]);

      //delete Sipplier
  const deleteSupplier=(id) =>{
    swal({
        title: "Are you sure?",
        text: "The supplier Will be removed from System",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
    axios.delete(`http://localhost:8070/supplier/supplierdelete/${id}`).then(()=>{
     
        if (willDelete) {
          swal("The file has been deleted!", 
          {icon :"success",});  
          setTimeout(function(){
          window.location.reload();
           },1000);
        } else {
          swal("File Is Not Deleted");}
    });
  }
  })
}

function myRefresh(){
  window.location.reload();
}

//fetch all suppliers
useEffect(()=>{
  const getSupplier = async()=>{
   const res = await axios.get('/supplier/onlysupplier/supplier').then((res)=>{
      setSupplier(res.data);
    }).catch(()=>{
      history.push(path);
      swal({title: "Unauthorized",
      text: "Your not an Manager",
      icon: "warning"} ); 
  })
  }
  getSupplier();
}, [])



  //generate PDF
  const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Name", "Nic No", "Metirial type", "Contact No","Email"];
    const tableRows = [];
    

    tickets.map(ticket => {
        const ticketData = [
            ticket.name,
            ticket.nicno,
            ticket.raw,
            ticket.contactno,
            ticket.email        
        ];
        tableRows.push(ticketData);
    })
    doc.text("All Suppliers Report", 14, 15).setFontSize(12);
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    


    // right down width height
    doc.addImage(img, 'JPEG', 170, 8, 25, 15);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    doc.save(`supplier_report_.pdf`);
    
  };

  return(
    <>
    <ManagerHeader/>
  <div className="head">
          
  <div className="allsuplft1">
    <div className="allsupcard1">
      <div className="container">
    <center><h1 style={{ fontFamily: "Arial,Helvetica,sans-serif", fontWeight: "bold", paddingTop:"10px" }}>All Suppliers</h1></center>
    <IconButton aria-label="refresh" onClick={myRefresh}>
                         <RefreshIcon className="refresh" fontSize="medium"/> 
                         </IconButton>
    
    <i class="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
      <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Suppliers by Nic No, Name, Metirial type" aria-label="Search" 
      
      onChange={(e) => {
          setsearchTerm(e.target.value)
      }}/>
    <div className="reportbtn">
      <button type="button" className="btn btn-outline-info" onClick={() => generatePDF(supplier)}>GenerateReport</button>
  </div>
  <br/>
  <div className="dacard2">
             <table  className="table table-bordered" >
             <table class="table table-hover" >
               <thead>
               
               
               <tr>
                  <th>Name</th>
                  <th>Nic No</th>
                  <th>Metirial type</th>
                  <th>Contact No</th>
                  <th>Email</th>

                </tr>
                </thead>
                <tbody>
                  
               {supplier.filter(val=>{
                          if (searchTerm === ''){
                              return val;
                          } else if(
                              val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              val.nicno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              val.raw.toLowerCase().includes(searchTerm.toLowerCase())
                          ){
                              return val;
                          }
                      }).map((supplier,key)=>(
                 
                <tr key={key}>      
                  <td className="damfont">{supplier.name}</td>
                  <td className="damfont">{supplier.nicno}</td>
                  <td className="damfont">{supplier.raw}</td>
                  <td className="damfont">{supplier.contactno}</td>
                  <td className="damfont">{supplier.email}</td>
                  
                  <td > <IconButton aria-label="delete"  onClick={() =>  deleteSupplier(supplier._id)}>
                         <DeleteForeverIcon fontSize="medium" color="secondary"/> 
                         </IconButton></td>   
                  </tr>
                 ))}
             </tbody>
             
                 
            </table>
            </table>
            </div>
          </div>    
  </div>

  </div>
  </div>
  </>
  );

}