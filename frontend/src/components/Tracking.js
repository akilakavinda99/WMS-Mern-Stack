import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './outbound.css';
import './outbound.scss';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';
import jspdf from 'jspdf'
import "jspdf-autotable"
import img from '../components/logo.png';
import Nav from './Nav';
import OutboundSidebar from './OutboundSidebar';
import {useHistory} from 'react-router-dom';

export default function Tracking() {

    const [order, setOrders] = useState([]);
    //search term
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

    const deleteOrder=(id) =>{

        //Delete from the database
        swal({
            title: "Are You Sure?",
            text: "The Order Will be Deleted from Outbound",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
                if(willDelete){
                axios.delete(`http://localhost:8070/addtoshipping/delete/${id}`).then(()=>{
            if (willDelete) {
              swal({
          title: 'The Order has been Deleted!',
          text: 'You can Continue with Your Orders.',
          icon:  "success",
          type: 'success'
        }).then(function() {
            window.location.href = "/Tracking";
        })  
            } else {
              swal("The Order is Not Deleted!",);
            }
          });
        }
    });
    
    }    
      useEffect(() => {
        //fetching outbound order data from the database
        axios.get("http://localhost:8070/addtoshipping/readyship").then((res) => {
            if (res.data.length > 0) {
                setOrders(res.data);
            }
        }).catch((e) => {
            console.log(e);
        })

    }, [])
       //generate PDF
  const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Order ID", "Shipping Address","Phone","Tracking Number","Shipping Status"];
    const tableRows = [];
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    tickets.map(ticket => {
        const ticketData = [
            ticket._id,
            ticket.address,
            ticket.contactNo,
            ticket.trackingnumber,
            ticket.shippingstatus,

        ];
        tableRows.push(ticketData);
    })
    doc.text("Outbound Details Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr} `, 14, 23);
    // right down width height
    doc.addImage(img, 'JPEG', 170, 8, 25, 15);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
    doc.save(`Outbound Details Report.pdf`);
  };

    return(
        <>{supplier.role === "manager"?<>
            <Nav/>
            <OutboundSidebar/>
        <div className="btn23">
            <img src="https://i.postimg.cc/FKmWsZ47/com-resize11111-unscreen-1.gif"/></div>
        <div className = "lft"><FadeIn>
            <div className = "cardq">
            <center>
            <h1>Outbound Order Details</h1></center><div className="btn4">
            <button type="button" class="btn btn-primary" onClick={() => generatePDF(order)}>Generate Report</button></div>
            <div className="btn2">
            {/* outbound order count*/}
            <button type="text" class="btnq btnq--skew btnq-default">Order Count : {order.length}</button></div><center>
        
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
                            <th >Order ID</th>
                            <th>Item ID</th>
                            <th>Shipping Address</th>
                            <th>Phone</th>
                            <th>Tracking Number</th>
                            <th>Shipping Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        order.filter(val=>{
                            // search function
                            if (searchTerm === ''){
                                return val;
                            } else if(
                                val.itemId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.trackingnumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.shippingstatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.contactNo.includes(searchTerm) ||
                                val._id.includes(searchTerm)
                            ){
                                return val;
                            }
                        }).map(function (f) {
                                return <tr>
                                    <td >{f._id} </td>
                                    <td >{f.itemId} </td>
                                    <td >{f.address} </td>
                                    <td >{f.contactNo} </td>
                                    <td >{f.trackingnumber} </td>
                                    <td >{f.shippingstatus} </td>
                                    <td > <Link to={"/update/" + f._id} ><Button variant="contained" color="primary" > Edit</Button></Link></td>
                                    <td > <Button variant="contained" color="secondary" onClick={() =>  deleteOrder(f._id)}>Delete</Button></td>
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
