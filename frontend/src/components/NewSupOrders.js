import React,{useState, useEffect} from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import './DSupOrders.css'
import { Link, useHistory, useParams } from "react-router-dom";
import SupplierHeader2 from "./SupHeaders/SupplierHeader2";
import swal from "sweetalert";
import jspdf from 'jspdf'
import "jspdf-autotable"
import img from '../components/SupAssets/logo.png';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

export default function NewSupOrders(){
  let history = useHistory();
  let path = '/supplier/supplierprofile';
  const [searchTerm, setsearchTerm] = useState("");
  const {id} = useParams();
  const [newsuporders, setNewSupOrders] = useState([]);

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

  useEffect(()=>{
    const getNewSupOrders = async()=>{
      const res = await axios.get('/supplier/allneworders').then((res)=>{
        setNewSupOrders(res.data);
      }).catch(()=>{
        history.push(path);
        swal({title: "Unauthorized",
        text: "Your not an admin",
        icon: "warning"});

      })
    }
    getNewSupOrders();
  },[])

  function myRefresh(){
    window.location.reload();
  }

  //Generate PDF
  const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = [ "Metirial Name", "Quantity","Requestdate","Beforedate"];
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
    doc.text("New Orders", 14, 15).setFontSize(12);
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    // right down width height
    // doc.addImage(img, 'JPEG', 190, 5, 15, 15);
    doc.addImage(img, 'JPEG', 170, 8, 25, 15);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    doc.save(`new_orders_.pdf`);
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
      <a class="nav-link active" aria-current="page" href="/supplier/allneworders">New Orders</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" href={"/supplier/myorders"}>Pending For Distribution</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" aria-current="page" href="/supplier/orderhistory">Orders History</a>
      </li>
      </ul>
      </div>
    <div className="container">
    <br/>
    <h1 style={{ fontFamily: "Arial,Helvetica,sans-serif", fontWeight: "bold" }}>New Orders</h1>
              <br/>
              <IconButton aria-label="refresh" onClick={myRefresh}>
                         <RefreshIcon className="refresh" fontSize="medium"/> 
                         </IconButton>
        <i class="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
        <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Orders by Meterial name, Quantity, Requested date, Before date" aria-label="Search" 
        
        onChange={(e) => {
            setsearchTerm(e.target.value)
        }}/><br/>
        <div className="orderreportbtn">
        <button type="button" className="btn btn-outline-info" onClick={() => generatePDF(newsuporders)}>GenerateReport</button>
        </div>
        <div className="supordercount">
        <h6>Orders Count: {newsuporders.length}</h6>
    </div>
    <div className="ordercard2">
    <table  className="table table-bordered" >
    <table class="table table-hover" >
    <thead>
    <tr>
                    <th>Material Name</th>
                    <th>Quantity</th>
                    <th>Request date</th>
                    <th>Before date</th>
                  </tr>
    </thead>
    <tbody>
      {newsuporders.filter(val=>{
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
                        }).map((newsuporders,key)=>(
        <tr key={key}>

            <td className="damorderfont">{newsuporders.itemName}</td>
            <td className="damorderfont">{newsuporders.quantity}</td>
            <td className="damorderfont">{newsuporders.requestdate}</td>
            <td className="damorderfont">{newsuporders.bdate}</td>
            <td > <Link to={"/supplier/getneworder/" + newsuporders._id} ><Button variant="contained" color="primary" > Accept </Button></Link></td>
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