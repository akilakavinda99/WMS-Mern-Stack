import React,{useState, useEffect} from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import './Order.css';
import OrderHeader from "./OrderHeaders/OrderHeader";
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import {useHistory} from "react-router-dom";

export default function RawMaterialRequests(){

    const [rawmaterialreq, setRawMaterialRequests] = useState([]);
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

      useEffect(() => {
        const getRequest = async()=>{
            const res = await axios.get('/Order/R').then((res) => {
            if (res.data.length > 0) {
                setRawMaterialRequests(res.data);
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
        
        <h1><center> Order Requests </center></h1>
        <i className="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Order Requests" aria-label="Search" 
        
        onChange={(e) => {
            setsearchTerm(e.target.value)
        }}/>
        <br></br>
        <div className="vcard2" >
        <table className="table table-bordered">
        <table className="table table-hover" >

                    <thead>
                        <tr>
                            <th><center> Material ID </center></th>
                            <th><center> Material Name </center></th>
                            <th><center> Quantity </center></th>
                            <th></th>
                            <th></th>
                        
                        </tr>

                
                    </thead>
                    <tbody>
                        {
                                                            rawmaterialreq.filter(val=>{
                                                                if (searchTerm === ''){
                                                                    return val;
                                                                } else if(
                                                                    val.itemID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                                    val.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                                    val.quantity.toLowerCase().includes(searchTerm.toLowerCase())
                                                                ){
                                                                    return val;
                                                                }
                                                            }).map(function (f) {
                                                                    return <tr>
                                                                <td ><center> {f.itemID} </center></td>
                                                                <td ><center> {f.itemName} </center></td>
                                                                <td ><center> {f.quantity} </center></td>
                                                                <td > <div className="d-grid gap-2 d-md-flex justify-content-md-end"><Link to={"/Order/getR/" + f._id} >
                                                                    <Button type="button" class="btn btn-success" > Request Raw Materials </Button></Link></div></td>
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