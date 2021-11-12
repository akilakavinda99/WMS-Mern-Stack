import React,{useState, useEffect} from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import './Order.css';
import OrderHeader from "./OrderHeaders/OrderHeader";
import swal from 'sweetalert';
import { Link , useHistory } from 'react-router-dom'
import jspdf from 'jspdf'
import 'jspdf-autotable'
import img from '../components/logo.png';




export default function AcceptedSubOrder(){

    const [supaccepteds, setSupAccepted] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");

    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/supplier/supplierprofile'; 
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


        const generatePDF = tickets => {
 
            const doc = new jspdf();
            const date = Date().split(" ");
            const dateStr = date[1] + "-" + date[2] + "-" + date[3];
            const tableColumn = ["Request ID","Nic No", "Material Name", "Quantity", "Request Date","Before Date"];
            const tableRows = [];
        
            tickets.map(ticket => {
                const ticketData = [
                    ticket._id,
                    ticket.nicno,
                    ticket.itemName,
                    ticket.quantity,
                    ticket.requestdate,
                    ticket.bdate,
                   
                ];
                tableRows.push(ticketData);
            })
            doc.text("Accepted Raw Material Requests Report", 14, 15).setFontSize(12);
            doc.text(`Report Genarated Date - ${dateStr} `, 14, 23);
            doc.addImage(img, 'JPEG', 170, 8, 25, 15);
            // right down width height
            doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
            doc.save(`Accepted_RawMaterial_report_.pdf`);
          };
 

      useEffect(() => {
        const getRequest = async()=>{
            const res = await axios.get('/supplier/allAorders').then((res) => {
                setSupAccepted(res.data);
        }).catch((e) => {
            history.push(path2);
            // swal({title: "Unauthorized",
            // text: "Your not an Manager" +e,
            // icon: "warning"} ); 
            alert(e);
        })
    }
    getRequest();
    }, [])


    return(

        <>
        <OrderHeader />
        <div className="vlft">
        <div className="vcard" >
        <div>
      <ul className="nav nav-tabs">
      <li className="nav-item">
      <a className="nav-link" aria-current="page" href="/Order/viewreq">Pending Requested materials</a>
      </li>
      <li className="nav-item">
      <a className="nav-link active" href="/Order/allAorders">Accepted Raw Material</a>
      </li>
      </ul>
      </div>

      <div className="vlft3">
        <Button type="button" class="btn btn-outline-warning" onClick={() =>  generatePDF(supaccepteds)}>Generate Report</Button>
        </div>
        <br></br>
    <br></br>
    <br></br>
    <br></br>
        
        <h1><center> Accepted Raw Material Requests </center></h1>
        <br></br>
        <br></br>

        <div className="row g-3">
        <div className="col-sm-7">
        <i className="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Order Requests" aria-label="Search" 
        
        onChange={(e) => {
            setsearchTerm(e.target.value)
        }}/>
        </div>

        <div className="col-sm">
        <h5>Pending Request Count : {supaccepteds.length}</h5>
        </div>
        </div>


        <br></br>
        <br></br>
        
        <div className="vcard2" >
        <table className="table table-bordered">
        <table className="table table-hover" >
                    <thead>
                        <tr>
                            <th><center> Request ID </center></th>
                            <th><center> NIC No </center></th>
                            <th><center> Material Name </center></th>
                            <th><center> Quantity </center></th>
                            <th><center> Requested Date </center></th>
                            <th><center> Before Date </center></th>
                            <th></th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                        supaccepteds.filter(val=>{
                                                                if (searchTerm === ''){
                                                                    return val;
                                                                } else if(
                                                                    val._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                                    val.nicno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                                    val.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                                    val.quantity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                                    val.requestdate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                                    val.bdate.toLowerCase().includes(searchTerm.toLowerCase())
                                                                ){
                                                                    return val;
                                                                }
                                                            }).map(function (f) {
                                return <tr>

                                    <td ><center> {f._id} </center></td>
                                    <td ><center> {f.nicno} </center></td>
                                    <td ><center> {f.itemName} </center></td>
                                    <td ><center> {f.quantity} </center></td>
                                    <td ><center> {f.requestdate} </center></td>
                                    <td ><center> {f.bdate} </center></td>

                                    {/* <td > <Button  type="button" className="btn btn-danger"  onClick={() =>  deleteRequestedMaterial(f._id)}>Delete</Button></td> */}

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