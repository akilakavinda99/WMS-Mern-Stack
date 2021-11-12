import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './outbound.css';
import './outbound.scss';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import OutboundSidebar from './OutboundSidebar';
import {useHistory} from 'react-router-dom';

export default function AllOrders() {

    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/supplier/supplierprofile';
    let path3 = '/agent/agentprofile';

    const [order, setOrders] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");

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
      
    //delete selected row from database
    const deleteOrder=(id) =>{
        swal({
            title: "Are you sure?",
            text: "The Order Will be Deleted from Outbound",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
                if(willDelete){
                axios.delete(`http://localhost:8070/order/delete/${id}`).then(()=>{
            if (willDelete) {
              swal({
          title: 'The Order has been Deleted!',
          text: 'You can Continue with Your Orders.',
          icon:  "success",
          type: 'success'
        }).then(function() {
            window.location.href = "/AllOrders";
        })  
            } else {
              swal("The Order is Not Deleted",);
            }
          });
        }
    });
    
    }    
      useEffect(() => {
        //fetching all outbound order data from the database
        axios.get("http://localhost:8070/order/").then((res) => {
            if (res.data.length > 0) {
                setOrders(res.data);
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
            <img src="https://i.postimg.cc/wv7HBHXf/5891ae9c5fa977784a7959ec4d7557-unscreen.gif"/></div>
        <div className = "lft"><FadeIn>
            <div className = "cardq">
            
            <center>
            <h1>Order Details</h1></center>
            <div className="btn2">
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
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Shipping Address</th>
                            <th>Phone</th>
                            <th>Add to Shipping</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                        order.filter(val=>{
                            if (searchTerm === ''){
                                return val;
                            } else if(
                                val.itemId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.quantity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.contactNo.includes(searchTerm) ||
                                val._id.includes(searchTerm)
                            ){
                                return val;
                            }
                        }).map(function (f) {
                                return <tr>
                                    <td >{f._id} </td>
                                    <td >{f.itemId} </td>
                                    <td >{f.itemName} </td>
                                    <td >{f.quantity} </td>
                                    <td >{f.address} </td>
                                    <td >{f.contactNo} </td>
                                    <td > <Link to={"/get/" + f._id} ><Button variant="contained" color="primary" > Add to Shipping</Button></Link></td>
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
