import React,{useState, useEffect} from "react";
import axios from "axios";
import './outbound.css';
import swal from 'sweetalert';
import FadeIn from 'react-fade-in';
import Nav from "./Nav";
import OutboundSidebar from "./OutboundSidebar";
import {useHistory} from 'react-router-dom';

export default function Request(){

    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/supplier/supplierprofile';
    let path3 = '/agent/agentprofile';
    const [itemid, Setitemid] = useState("");
    const [itemstatus, Setitemstatus] = useState("");
    const [qty, Setqty] = useState("");
    const [otime, Setotime] = useState("");
    const [odate, Setodate] = useState("");
    const [message, Setmessage] = useState("");
    const [supplier, setSupplier] = useState([]);

    const [getItemId, setgetItemId] = useState([]);

    useEffect(()=>{
      // getting data from item database for displaying in the selection
            axios.get("http://localhost:8070/item/").then((res) => { 
                  if (res.data.length > 0) {
                    setgetItemId(res.data.map(item => item.itemID))
                  }
              }).catch((e) => {
                  console.log(e);
              },)
         
       })

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
    //Send data to database
    function sendData(e){
        e.preventDefault();

        const newRequest = {
            itemid,
            itemstatus,
            qty,
            otime,
            odate,
            message
        }
        swal({
            title: "Are you sure?",
            text: "Your Request is Send to the Inventory",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willSent) => {
                if(willSent){
                axios.post("http://localhost:8070/request/send", newRequest).then(()=>{
            if (willSent) {
              swal({
          title: 'The Request has Sent!',
          text: 'You can Continue with Your Requests.',
          icon:  "success",
          type: 'success'
        }).then(function() {
            window.location.href = "/InventoryRequest";
        })  
            } else {
              swal("The Request is Not Sent!",);
            }
          });
        }
    });
        
    }

    return(
      <>{supplier.role === "manager"?<>
            <Nav/>
            <OutboundSidebar/>
        <div className = "lft">
            <div className = "cardq">
            <center><FadeIn>
            <h1>Inventory Update Request</h1>
            </FadeIn>
            </center>
            <div class="cardq" >
            <form onSubmit={sendData} className="frm" novalidate><FadeIn>
                <div class="mb-3">
                <label for="ItemID" class="form-label"><strong>Item ID</strong></label>
                <select class="form-select" aria-label="ItemID" onChange={(e) => {
                                    Setitemid(e.target.value)
                                }} required>
                 {/* get itemid from inventory databse                  */}
                 <option ></option>
                                    {
                                        getItemId.map(function (item) {
                                            return <option key={item} value={item}>{item}</option>
                                        })
                                    }
                        </select>
                                </div>

        <div class="mb-3">
        <label for="ItemStatus" class="form-label"><strong>Item Status</strong></label>
                <select class="form-select" aria-label="ItemStatus" onChange={(e) => {
                                    Setitemstatus(e.target.value)
                                }} required>
        <option selected></option>
        <option >Item Shipped</option>
        <option >Item Not Shipped</option>
        </select>
        </div>

   <div class="mb-3">
          <label for="Quantity" class="form-label"><strong>Quantity</strong></label>
          <input id="Quantity" type="text" class="form-control"id="Quantity" onChange ={(e)=>{

Setqty(e.target.value);
}} required></input>
          </div>
          <div class="mb-3">
          <label for="RequestTime" class="form-label"><strong>Request Time</strong></label>
          <input type="time" class="form-control" id="RequestTime" onChange ={(e)=>{

Setotime(e.target.value);
}}required></input>
          </div>

          <div class="mb-3">
          <label for="RequestDate" class="form-label"><strong>Request Date</strong></label>
          <input type="date" class="form-control" id="RequestDate" onChange ={(e)=>{

Setodate(e.target.value);
}}required></input>
          </div>
          <div class="mb-3">
          <label for="Message" class="form-label"><strong>Message</strong></label>
          <textarea className="form-control" rows="3" id="Message" placeholder=""onChange ={(e)=>{

Setmessage(e.target.value);
}}required></textarea>
          </div>
          <center>        
          <div class="inner">
          <button type="submit" class="btn btn-primary btn-lg"> Send</button></div>	
          <div class="inner">
          <button type="reset" class="btn btn-danger btn-lg"> Reset</button></div>
          </center>
          </FadeIn></form>
      </div>
      </div>
      </div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}
      </>
    )

}