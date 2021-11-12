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


export default function ViewInbound() {

    const [searchTerm, setsearchTerm] = useState("");
    
    const [inbound, setinbound] = useState([]);
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
      
//delete function
    const deleteInbound=(id) =>{
        swal({
            title: "Are you sure?",
            text: "Item Is Not Available Once Deleted...",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
              if(willDelete){
        axios.delete(`http://localhost:8070/inbound/delete/${id}`).then(()=>{
           
        
                if (willDelete) {
                  swal("Item Succesfully Deleted!!", {
                    icon: "success",
                  });setTimeout(function(){
                                window.location.reload();
                               },1000);}
                // } else {
                //               swal("File Is Not Deleted");
                //             } 
              }).catch((e) => {
                swal("File Is Not Deleted");
            })
    
            }
            
        //       .then((willDelete) => {
        //         if (willDelete) {
        //           swal("The file has been deleted!", 
        //             "success","success"
        //           );  setTimeout(function(){
        //             window.location.reload();
        //            },1000);
        //         } else {
        //           swal("File Is Not Deleted");
        //         }
        //       });
       
        // })
      })
    }


    useEffect(() => {
        //fetching all inbound item data from the database
        axios.get("http://localhost:8070/inbound").then((res) => {
            if (res.data.length > 0) {
                setinbound(res.data);
            }
        }).catch((e) => {
            console.log(e);
        })

    }, [])
    // let img = <img src="https://img.icons8.com/fluency/96/000000/bitcoin.png"/>
//generate PDF function
    const generatePDF = tickets => {

        const doc = new jspdf();
        const tableColumn = ["Item ID", "Item Name", "Quantity", "BatchNo","ReceivedTime","ReceivedDate"];
        const tableRows = [];
    
        tickets.map(ticket => {
            const ticketData = [
                ticket.itemID,
                ticket.itemName,
                ticket.quantity,
                ticket.batchNo,
                ticket.receivedTime,
                ticket.receivedDate
               
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
            
    <h1 ><strong> Inbound Management </strong></h1>
    
    </div >
    <div class="head1">
    <i class="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
        <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Items  " aria-label="Search" 
        
        onChange={(e) => {
            setsearchTerm(e.target.value)
        }}/> </div >
    <div className="txtAK">
    <button type="button" class="btn btn-info">Total Items-{inbound.length}</button>
                    {/* <span>Total Inventory-</span> */}
                    
                </div>
    <div class="num2AK">
        <button type="button" class="btn btn-outline-secondary" onClick={() => generatePDF(inbound)}>GenerateReport</button>
    </div>
    
        <div class="lftAK">
        <br/><br/><br/>
<div class="cardAK" >
    
<div class="content-box1" >
    
    
    <table class="table table-striped">
         <table class="table table-hover" >
                    <thead>
                        <tr>
                            <th >Item ID</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>BatchNo</th>
                            <th>ReceivedTime</th>
                            <th>ReceivedDate</th>
                            <th>Delete</th>
                            <th>Edit</th>
                            <th>Check Quality</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            inbound.filter(val=>{
                                if (searchTerm === ''){
                                    return val;
                                } else if(
                                    val.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.quantity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.receivedTime.toLowerCase().includes(searchTerm.toLowerCase())||
                                    val.receivedDate.toLowerCase().includes(searchTerm.toLowerCase())
                                ){
                                    return val;
                                }
                            }).map(function (f) {
                               return  <tr>
                                    
                                  
                                    <td >{f.itemID}</td>
                                    <td >{f.itemName} </td>
                                    <td >{f.quantity} </td>
                                    <td >{f.batchNo} </td>
                                    <td >{f.receivedTime} </td>
                                    <td >{f.receivedDate} </td>
                                    


                                    <td >
<button class="btn btn-outline-danger"   onClick={() =>  deleteInbound(f._id)}>Delete</button>
                                        
                
         </td>

        <td > 
        <Link to={"/inbound/updateinbound/" + f._id} ><button class="btn btn-outline-warning">Edit</button>
                                 </Link> 
                
                                       
                                      </td>
                                      <td > 
    <Link to={"/inbound/qualitycheck/" + f._id} ><button class="btn btn-outline-success">Quality Check</button> 
                                      </Link>  
                
                                       
                                      </td>

                                </tr>

                            })
                       } 
                    </tbody>
                    </table>
                </table>
</div>
</div>
</div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}


        </>
    
    )








}