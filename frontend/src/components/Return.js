import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './outbound.css';
import './outbound.scss';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import FadeIn from 'react-fade-in';
import jspdf from 'jspdf'
import "jspdf-autotable"
import img from '../components/logo.png';
import Nav from './Nav';
import OutboundSidebar from './OutboundSidebar';
import {useHistory} from 'react-router-dom';


export default function Return() {

    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/supplier/supplierprofile';
    let path3 = '/agent/agentprofile';
    const [returno, setReturns] = useState([]);
    //search term
    const [searchTerm, setsearchTerm] = useState("");
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

    const deletePackage=(id) =>{

        //Delete from the database
        swal({
            title: "Are You Sure?",
            text: "The Package Will be Deleted from Outbound",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
                if(willDelete){
                axios.delete(`http://localhost:8070/addtoreturn/delete/${id}`).then(()=>{
            if (willDelete) {
              swal({
          title: 'The Package has been Deleted!',
          text: 'You can Continue with Your Packages.',
          icon:  "success",
          type: 'success'
        }).then(function() {
            window.location.href = "/Return";
        })  
            } else {
              swal("The Package is Not Deleted!",);
            }
          });
        }
    });
    
    }    
      useEffect(() => {
        //fetching outbound Package data from the database
        axios.get("http://localhost:8070/addtoreturn/returnready").then((res) => {
            if (res.data.length > 0) {
                setReturns(res.data);
            }
        }).catch((e) => {
            console.log(e);
        })

    }, [])
       //generate PDF
  const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Item ID","Item Name","Quantity","Batch No","Shipping Address","Tracking Number","Shipping Status"];
    const tableRows = [];
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    tickets.map(ticket => {
        const ticketData = [
            ticket.itemID,
            ticket.itemName,
            ticket.quantity,
            ticket.batchNo,
            ticket.address,
            ticket.trackingnumber,
            ticket.shippingstatus,

        ];
        tableRows.push(ticketData);
    })
    doc.text("Returned Packages Detail Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr} `, 14, 23);
    // right down width height
    doc.addImage(img, 'JPEG', 170, 8, 25, 15);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
    doc.save(`Outbound Return Packages Detail Report.pdf`);
  };

    return(
        <>{supplier.role === "manager"?<>
            <Nav/>
            <OutboundSidebar/>
        <div className="btn23">
            <img src="https://i.postimg.cc/DfY0NS22/s.gif"/></div>
        <div className = "lft"><FadeIn>
            <div className = "cardq">
            <center>
            <h1>Return Packages Details</h1></center><div className="btn4">
            <button type="button" class="btn btn-primary" onClick={() => generatePDF(returno)}>Generate Report</button></div>
            <div className="btn2">
            {/* outbound return package count*/}
            <button type="text" class="btnq btnq--skew btnq-default">Packages Count : {returno.length}</button></div><center>
        
        <i class="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
        <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Orders" aria-label="Search" 
        
        onChange={(e) => {
            setsearchTerm(e.target.value)
        }}/>
        </center>
        
        <div class="cardq" >
        <div className="cardsc">
        
    <table class="table table-bordered">
         <table class="table table-hover" >
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Batch No</th>
                            <th>Shipping Address</th>
                            <th>Tracking Number</th>
                            <th>Shipping Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        returno.filter(val=>{
                            // search function
                            if (searchTerm === ''){
                                return val;
                            } else if(
                                val.itemID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.quantity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.trackingnumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.shippingstatus.toLowerCase().includes(searchTerm.toLowerCase())
                            ){
                                return val;
                            }
                        }).map(function (f) {
                                return <tr>
                                    <td >{f.itemID} </td>
                                    <td >{f.itemName} </td>
                                    <td >{f.quantity} </td>
                                    <td >{f.batchNo} </td>
                                    <td >{f.address} </td>              
                                    <td >{f.trackingnumber} </td>
                                    <td >{f.shippingstatus} </td>
                                    <td > <Button variant="contained" color="secondary" onClick={() =>  deletePackage(f._id)}>Delete</Button></td>
                                </tr>
                            })
                        }
                    </tbody>
                    </table>
                    </table>
            </div>
            </div> </div></FadeIn>   
        </div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}
        </>
    )
}
