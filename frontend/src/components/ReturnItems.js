import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './outbound.css';
import './outbound.scss';
import Button from '@material-ui/core/Button';
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import OutboundSidebar from './OutboundSidebar';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';

export default function ReturnItems() {

    const [Returnitems, setqualityF] = useState([]);
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
      
      useEffect(() => {
        //fetching all return items data from the database
        axios.get("http://localhost:8070/return/").then((res) => {
            if (res.data.length > 0) {
                setqualityF(res.data);
            }
        }).catch((e) => {
            console.log(e);
        })

    }, [])

    return(
        <>{supplier.role === "manager"?<>
            <Nav/>
            <OutboundSidebar/>
        <div className="btn23">
            <img src="https://i.postimg.cc/Y9p19FnY/hy.gif"/></div>
        <div className = "lft"><FadeIn>
            <div className = "cardq">
            
            <center>
            <h1>Quality Failed Item Details</h1></center>
            <div className="btn2">
            <button type="text" class="btnq btnq--skew btnq-default">Package Count : {Returnitems.length}</button></div><center>
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
                            <th>Item ID</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Batch No</th>
                            <th>Description</th>
                            <th>Shipping Address</th>
                            <th>Add to Shipping</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                        Returnitems.filter(val=>{
                            if (searchTerm === ''){
                                return val;
                            } else if(
                                val.itemID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.quantity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.batchNo.toLowerCase().includes(searchTerm.toLowerCase())
                            ){
                                return val;
                            }
                        }).map(function (f) {
                                return <tr>
                                    <td >{f.itemID} </td>
                                    <td >{f.itemName} </td>
                                    <td >{f.quantity} </td>
                                    <td >{f.batchNo} </td>
                                    <td >{f.description} </td>
                                    <td >{f.address} </td>
                                    <td > <Link to={"/getr/" + f._id} ><Button variant="contained" color="primary" > Return Package</Button></Link></td>
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
