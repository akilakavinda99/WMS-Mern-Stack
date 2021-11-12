import React,{useState, useEffect} from "react";
import axios from "axios";
import './DSupOrders.css'
import swal from "sweetalert";
import SupplierHeader2 from "./SupHeaders/SupplierHeader2";
import { useHistory, useParams} from "react-router-dom";
import jspdf from 'jspdf'
import "jspdf-autotable"
import img from '../components/SupAssets/logo.png';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { blue } from "@material-ui/core/colors";

export default function SupOrderHistory(){

  let history = useHistory();
  let path = '/supplier/login';
  let path3 = '/agent/agentprofile';
  let path2 = '/supplier/supplierprofile';
  const [searchTerm, setsearchTerm] = useState("");

  const[suporderhistory, setSupOrderHistory]= useState([]);
  const {id} = useParams();

  const [supplier, setSupplier] = useState([]);

  const deleteOrder=(id) =>{
    swal({
        title: "Are you sure?",
        text: "The supplier Will be removed from System",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
    axios.delete(`http://localhost:8070/supplier/deleteorderhistory/${id}`).then(()=>{
     
        if (willDelete) {
          swal("The file has been deleted!", 
          {icon :"success",});  
          setTimeout(function(){
          window.location.reload();
           },2500);
        } else {
          swal("File Is Not Deleted");}
    });
  }
  })
}

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

  function myRefresh(){
    window.location.reload();
  }

  useEffect(()=>{
    const getSupOrderHistory = async()=>{
      const res = await axios.get(`/supplier/orderhistory`).then((res)=>{
        setSupOrderHistory(res.data);
      }).catch(()=>{
        history.push(path3);
        swal({title: "Unauthorized",
          text: "Your not an supplier",
          icon: "warning"} );
      })
    }
    getSupOrderHistory();
  },[])

      //generate PDF
      const generatePDF = tickets => {

        const doc = new jspdf();
        const tableColumn = ["Metirial Name", "Quantity","Requestdate","Beforedate"];
        const tableRows = [];
    
        tickets.map(ticket => {
            const ticketData = [
              ticket.itemName,
              ticket.quantity,
              ticket.requestdate,
              ticket.bdate         
            ];
            tableRows.push(ticketData);
        })
        doc.text(supplier.name+"'s Order History", 14, 15).setFontSize(12);
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        // right down width height
        // doc.addImage(img, 'JPEG', 190, 5, 15, 15);
        doc.addImage(img, 'JPEG', 170, 8, 25, 15);
        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
        doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
        doc.text("Nic No: " +supplier.nicno, 14, 31).setFontSize(5);
        doc.save(`order_history_.pdf`);
      };
  return(
    <>
    <SupplierHeader2/>
    <div className="head">
    <div className="ordersuplft1">
    <div className="ordersupcard1">
    <div>
      <ul class="nav nav-tabs">
      <li class="nav-item">
      <a class="nav-link"  href="/supplier/allneworders">New Orders</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" aria-current="page" href="/supplier/myorders">Pending For Distribution</a>
      </li>
      <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="/supplier/orderhistory">Orders History</a>
      </li>
      </ul>
      </div>
    
    <div className="container">
    <br/>
    <h1 style={{ fontFamily: "Arial,Helvetica,sans-serif", fontWeight: "bold" }}>My Orders History</h1>

    <br/>
    <IconButton aria-label="refresh" onClick={myRefresh}>
                         <RefreshIcon className="refresh" fontSize="medium"/> 
                         </IconButton>
    <i class="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
        <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Orders by Metirial name, Quantity, Requested date, Before date" aria-label="Search" 
        
        onChange={(e) => {
            setsearchTerm(e.target.value)
        }}/>
      <div className="orderreportbtn">
        <button type="button" className="btn btn-outline-info" onClick={() => generatePDF(suporderhistory)}>GenerateReport</button>
        
    </div>
    <div className="supordercount"><h6>Orders Count: {suporderhistory.length}</h6></div>
    <br/><br/>
    <div className="ordercard2">
    <table  className="table table-bordered" >
    <table class="table table-hover" >
    <thead>
    <tr>
        <th>MaterialName</th>
        <th>Quantity</th>
        <th>Requestdate</th>
        <th>Beforedate</th>

    </tr>
    </thead>
    <tbody>
      {suporderhistory.filter(val=>{
                            if (searchTerm === ''){
                                return val;
                            } else if(
                                val.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.quantity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.requestdate.toLowerCase().includes(searchTerm.toLowerCase())||
                                val.bdate.toLowerCase().includes(searchTerm.toLowerCase())
                            ){
                                return val;
                            }
                        }).map((suporderhistory,key)=>(
        <tr key={key}>

            <td className="damorderfont">{suporderhistory.itemName}</td>
            <td className="damorderfont">{suporderhistory.quantity}</td>
            <td className="damorderfont">{suporderhistory.requestdate}</td>
            <td className="damorderfont">{suporderhistory.bdate}</td>
            <td > <IconButton aria-label="delete"  onClick={() =>  deleteOrder(suporderhistory._id)}>
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