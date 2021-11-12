import React,{useState, useEffect} from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import './Order.css';
import OrderHeader from "./OrderHeaders/OrderHeader";
import swal from 'sweetalert';
import {useHistory} from "react-router-dom";
import { Link } from 'react-router-dom'

export default function OrderRequests(){

    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/supplier/supplierprofile'; 

    const [orderrequest, setOrderRequests] = useState([]);
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

      useEffect(() => {
        const getRequest = async()=>{
            const res = await axios.get('/Order/orderreq').then((res) => {
            if (res.data.length > 0) {
                setOrderRequests(res.data);
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
        <div className="vlft">
        <div className="vcard" >
        
        
        <h1><center> Pending Order Requests </center></h1>
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
        <h5>Pending Order Request Count : {orderrequest.length}</h5>
        </div>
        </div>


        <br></br>
        <br></br>

        
        <div className="vcard2" >
        <table className="table table-bordered">
        <table className="table table-hover" >
                    <thead>
                        <tr>
                            <th><center> Item ID </center></th>
                            <th><center> Item Name </center></th>
                            <th><center> Quantity </center></th>
                            <th></th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderrequest.filter(val=>{
                                if (searchTerm === ''){
                                    return val;
                                } else if(
                                    val.itemId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.quantity.toLowerCase().includes(searchTerm.toLowerCase())
                                ){
                                    return val;
                                }
                            
                            }).map(function (f) {
                                return <tr>
                                    <td ><center> {f.itemId} </center></td>
                                    <td ><center> {f.itemName} </center></td>
                                    <td ><center> {f.quantity} </center></td>
                                    <td > <div className="d-grid gap-2 d-md-flex justify-content-md-end"><Link to={"/Order/getorder/" + f._id} >
                                    <Button type="button" class="btn btn-success" > VALIDATE </Button></Link></div></td>
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