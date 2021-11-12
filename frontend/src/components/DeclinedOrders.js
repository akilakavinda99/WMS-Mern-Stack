import React,{useState, useEffect} from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import './Order.css';
import swal from 'sweetalert';
import OrderHeader from "./OrderHeaders/OrderHeader";
import jspdf from 'jspdf'
import 'jspdf-autotable'
import img from '../components/logo.png';
import {useHistory} from "react-router-dom";


export default function DeclinedOrders(){

    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/supplier/supplierprofile';

    const [declinedorders, setDeclinedOrders] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");
    const [supplier, setSupplier] = useState([]);

    useEffect(()=>{
        const fetchUser = async ()=>{
          const res = await axios.get('/supplier/supplierprofile').then((res)=>{
          setSupplier(res.data)
          }).catch(()=>{
            history.push(path);
            swal({title: "unauthorized",
            text: "Please Login First",
            icon: "warning"} ); 
        })
      }
        fetchUser();
      },[]);

      const deleteDeleteOrders=(id) =>{
        swal({
            title: "Are you sure?",
            text: "The Request Will be Deleted from Declined Orders",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
                if(willDelete){
            axios.delete(`http://localhost:8070/Order/deleteDorder/${id}`).then(()=>{


            if (willDelete) {
              swal({
                title: "The Order has been Removed!",
                text: "You can Continue with Your Other Orders.",
                icon:  "success",
                type: "success"
              }).then(function(){
                window.location.href="/Order/declinedorders";
               })
            } else {
              swal("Request Is Not Deleted");
            }
          });
        }
    });
    
    }

    const generatePDF = tickets => {
 
        const doc = new jspdf();
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        const tableColumn = ["Order ID","Item ID", "Item Name", "Quantity", "Contact No","Address","Reason"];
        const tableRows = [];
    
        tickets.map(ticket => {
            const ticketData = [
                ticket._id,
                ticket.itemId,
                ticket.itemName,
                ticket.quantity,
                ticket.contactNo,
                ticket.address,
                ticket.status
               
            ];
            tableRows.push(ticketData);
        })
        doc.text("Declined Orders Report", 14, 15).setFontSize(12);
        doc.text(`Report Genarated Date - ${dateStr} `, 14, 23);
        doc.addImage(img, 'JPEG', 170, 8, 25, 15);
        // right down width height
        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
        doc.save(`Declined_Orders_.pdf`);
      };

      useEffect(() => {
        const getRequest = async()=>{        
            const res = await axios.get('/Order/declinedorders').then((res) => {
            if (res.data.length > 0) {
                setDeclinedOrders(res.data);
            }
        }).catch(() => {
            history.push(path2);
            swal({title: "Unauthorized",
            text: "Your not an Manager",
            icon: "warning"} ); 
        })
    }
    getRequest();
    }, [])

    return(

        <>
        <OrderHeader />
        <div className="vlft4">
        <Button type="button" class="btn btn-outline-warning"  onClick={() =>  generatePDF(declinedorders)}>Generate Report</Button>
        </div>
    

        <div className="vlft">
        <div className="vcard" >

        <h1><center> Declined Orders </center></h1>
        <br></br>
        <br></br>


        <div className="row g-3">
        <div className="col-sm-7">
        <i className="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Declined Orders" aria-label="Search" 
        
        onChange={(e) => {
            setsearchTerm(e.target.value)
        }}/>
        </div>

        <div className="col-sm">
        <h5>Declined Order Count : {declinedorders.length}</h5>
        </div>
        </div>

        <br></br>
        <br></br>

        <div className="vcard5" >
        <table className="table table-bordered">
        <table className="table table-hover" >
                    <thead>
                        <tr>
                            <th><center> Order ID </center></th>
                            <th><center> Item ID </center></th>
                            <th><center> Item Name </center></th>
                            <th><center> Quantity </center></th>
                            <th><center> Contact No </center></th>
                            <th><center> Address </center></th>
                            <th><center> Reason </center></th>
                            <th></th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        {
                                declinedorders.filter(val=>{
                                    if (searchTerm === ''){
                                        return val;
                                    } else if(
                                        val._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.itemId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.quantity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.contactNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.status.toLowerCase().includes(searchTerm.toLowerCase())
                                    ){
                                        return val;
                                    }
                                }).map(function (f) {
                                        return <tr>
                                    <td ><center> {f._id} </center> </td>
                                    <td ><center> {f.itemId} </center> </td>
                                    <td ><center> {f.itemName} </center> </td>
                                    <td ><center> {f.quantity} </center> </td>
                                    <td ><center> {f.contactNo} </center> </td>
                                    <td ><center> {f.address} </center> </td>
                                    <td style={{ color: 'red' }} ><center> {f.status} </center> </td>
                                    <td > <Button type="button" class="btn btn-outline-danger" onClick={() =>  deleteDeleteOrders(f._id)}> Delete </Button></td>
                                        </tr>
        
                                    })
                 
                        }
                    </tbody>
                    </table>
                </table>
                </div>
</div>
</div>
</>

    )

}