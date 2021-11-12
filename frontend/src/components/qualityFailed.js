import React,{useState, useEffect} from "react";
import axios from "axios";
import Header from '../components/InboundHeaders/Header'

import './inboundcss.css';
import swal from 'sweetalert';
import { Link } from 'react-router-dom'
import jspdf from 'jspdf'
import "jspdf-autotable"
import img from '../components/logo.png';
import {useHistory} from 'react-router-dom';

export default function ViewQualityFailed() {

    const [failedItem, setFailedItem] = useState([]);
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
        //fetching all quality failed item data from the database
        axios.get("http://localhost:8070/failed").then((res) => {
            if (res.data.length > 0) {
                setFailedItem(res.data);
            }
        }).catch((e) => {
            console.log(e);
        })

    }, [])

    const generatePDF = tickets => {

        const doc = new jspdf();
        const tableColumn = ["Item ID", "Item Name", "Quantity", "BatchNo","Description"];
        const tableRows = [];
    
        tickets.map(ticket => {
            const ticketData = [
                ticket.itemID,
                ticket.itemName,
                ticket.quantity,
                ticket.batchNo,
                ticket.description
                
               
            ];
            tableRows.push(ticketData);
        })
        doc.text("Inbound Report", 14, 15).setFontSize(12);
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        // right down width height
        doc.addImage(img, 'JPEG', 170, 8, 25, 15);
        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
        doc.text(`Report Genarated Date - ${dateStr} `, 14, 23).setFontSize(9)
        doc.save(`Inventory_report_${dateStr}.pdf`);
      };


    return (

        <>{supplier.role === "manager"?<>
       
         <Header/><div class="headAK">
    <h1 ><strong> Quality Failed Items </strong></h1>
    
    </div>
    <div className="txtAK">
    <button type="button" class="btn btn-info">Total Items-{failedItem.length}</button>
                    {/* <span>Total Inventory-</span> */}
                    
                </div>
                {/* <div className="num">
           <span>{failedItem.length}</span></div> */}
    <div class="num">
    <button type="button" class="btn btn-outline-secondary"onClick={() => generatePDF(failedItem)} >Generate PDF</button>
    </div>
        <div class="lftAK">
<div class="cardAK" >
    <br/>
<div class="content-box1" >
    <div class="scroll">
    
    {/* <table class="table table-striped"> */}
    <table class="table table-striped">
         {/* <table class="table"> */}
                    <thead  class="thead-dark">
                        <tr>
                            <th >Item ID</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>BatchNo</th>
                            <th>Description</th>
                            <th>Returning</th>
                          

                        </tr>
                    </thead>
                    <tbody>
                        {
                            failedItem.map(function (f) {
                                return <tr>
                                    
                                  
                                    <td >{f.itemID}</td>
                                    <td >{f.itemName} </td>
                                    <td >{f.quantity} </td>
                                    <td >{f.batchNo} </td>
                                    <td >{f.description} </td>

                                    <td > 
    <Link to={"/inbound/returning/" + f._id} ><button class="btn btn-warning">Send To Return</button> 
                                      </Link>  
                
                                       
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




        </>
    
    )








}

