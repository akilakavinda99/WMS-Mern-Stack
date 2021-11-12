import React,{useState, useEffect} from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import './Order.css';
import OrderHeader from "./OrderHeaders/OrderHeader";
import swal from 'sweetalert';
import { Link , useHistory} from 'react-router-dom'
import jspdf from 'jspdf'
import 'jspdf-autotable'
import img from '../components/logo.png';




export default function ViewRequestedMaterial(){

    const [requestedmaterial, setRequestedMaterial] = useState([]);
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
      
    const deleteRequestedMaterial=(id) =>{
            swal({
                title: "Are you sure?",
                text: "The Request Will be Deleted from Requested Materials",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                    if(willDelete){
                axios.delete(`http://localhost:8070/Order/deletereq/${id}`).then(()=>{


                if (willDelete) {
                  swal({
                    title: "The Request has been deleted!",
                    text: "You can Continue with Your Other Requests.",
                    icon:  "success",
                    type: "success"
                  }).then(function(){
                    window.location.href="/Order/viewreq";
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
            const tableColumn = ["Request ID","Material ID", "Material Name", "Quantity", "Request Date","Before Date"];
            const tableRows = [];
        
            tickets.map(ticket => {
                const ticketData = [
                    ticket._id,
                    ticket.itemName,
                    ticket.quantity,
                    ticket.requestdate,
                    ticket.bdate,
                   
                ];
                tableRows.push(ticketData);
            })
            doc.text("Pending Raw Material Requests Report", 14, 15).setFontSize(12);
            doc.text(`Report Genarated Date - ${dateStr} `, 14, 23);
            doc.addImage(img, 'JPEG', 170, 8, 25, 15);
            // right down width height
            doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
            doc.save(`Requesed_RawMaterial_report_.pdf`);
          };
 

      useEffect(() => {
        const getRequest = async()=>{
            const res = await axios.get('/Order/viewreq').then((res) => {
                setRequestedMaterial(res.data);
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
      <div className="vlft">
      <div className="vcard" >
      <div>
      <ul className="nav nav-tabs">
      <li className="nav-item">
      <a className="nav-link active" aria-current="page" href="/Order/viewreq">Pending Requested materials</a>
      </li>
      <li className="nav-item">
      <a className="nav-link " href="/Order/allAorders">Accepted Raw Material</a>
      </li>
      </ul>
      </div>

      <div className="vlft3">

      <Button type="button" class="btn btn-outline-warning" onClick={() =>  generatePDF(requestedmaterial)}>Generate Report</Button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <h1><center> Pending Requested Raw Materials </center></h1>
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
      <h5>Pending Request Count : {requestedmaterial.length}</h5>
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
                                                          requestedmaterial.filter(val=>{
                                                              if (searchTerm === ''){
                                                                  return val;
                                                              } else if(
                                                                  val._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                                  <td ><center> {f.itemName} </center></td>
                                  <td ><center> {f.quantity} </center></td>
                                  <td ><center> {f.requestdate} </center></td>
                                  <td ><center> {f.bdate} </center></td>

                                  <td > <Link to={"/Order/updatereq/" + f._id} ><Button type="button" class="btn btn-primary" > Edit Request </Button></Link></td>
                                  <td > <Button  type="button" class="btn btn-danger"  onClick={() =>  deleteRequestedMaterial(f._id)}>Delete</Button></td>

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