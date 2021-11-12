import React,{useState, useEffect} from "react";
import axios from "axios";
import AgentHeader2 from './AgentHeaders/AgentHeader2';
import './ReqOrder.css';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

import './ReqOrder.css'
import AgentHeader from "./AgentHeaders/AgentHeader";
// import { set } from "mongoose";


export default function Request(){
    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/supplier/supplierprofile';

    const [supplier, setSupplier] = useState([]);
    const [itemId, SetitemId] = useState("");
    const [itemName, SetitemName] = useState("");
    const [quantity, Setquantity] = useState("");
    const [contactNo, SetcontactNo] = useState("");
    // const [odate, Setodate] = useState("");
    const [address, Setaddress] = useState("");
    const [getItemId, setgetItemId] = useState([]);
    const [getItemName, setgetItemName] = useState([]);

    // useEffect(()=>{
    //     function getitem(){
    //         axios.get("http://localhost:8070/agent/itemid").then((res)=>{
    //             setItem(res.data.getitem)
    //             SetitemId(res.data.getitem.itemID)
    //             SetitemName(res.data.getitem.itemName)

    //         }).catch((err)=>{
    //             alert(err.message);
    //         })
    //     }
    //     getitem();
    // }, [])

    useEffect(()=>{
        // getting data from item database for displaying in the selection
              axios.get("http://localhost:8070/item/").then((res) => { 
                    if (res.data.length > 0) {
                      setgetItemId(res.data.map(item => item.itemID))
                    }
                }).catch((e) => {
                    // console.log(e);
                },)

                  
      axios.get("http://localhost:8070/item/").then((res) => {
        if (res.data.length > 0) {
          setgetItemName(res.data.map(item => item.itemName))
        }
    }).catch((e) => {
        // console.log(e);
    },)

})

function myFunction(){
    history.push(path2);
      swal({title: "unauthorized",
      text: "Your not an agent",
      icon: "warning"} ); 
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
  },[]);


    function sendData(e){
        e.preventDefault();

        const neworderrequest = {
            itemId,
            itemName,
            quantity,
            contactNo,
            // odate,
            address
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
                axios.post("http://localhost:8070/req/add", neworderrequest).then(()=>{
            if (willSent) {
              swal({
          title: 'The Request has Sent!',
          text: 'You can Continue with Your Requests.',
          icon:  "success",
          type: 'success'
        }).then(function() {
            window.location.href = "/agent/add";
        })
            } else {
              swal("The Request is Not Sent!",);
            }
          });
        }
    });

    }



return(
      <>
      <AgentHeader2/>
      
      {supplier.role === "agent"?
        <div className = "lft">
            <div className = "card">
            <center>
            <h1>Order Request</h1>

            {/* <table className="table table-bordered" >
                          <table class="table table-hover" >
                              <thead>

                                <tr>
                                    <th>Item Id</th>
                                    <th>Item Name</th>
                                    
                                </tr>
                              </thead>
                              <tbody>
                                
                                {getitem.map((getitem,key)=>(

                                <tr key={key}>
                                    <td>{getitem.itemID}</td>
                                    <td>{getitem.itemName}</td>
                                    


                                </tr>
                                ))}
                              </tbody>
                          </table>
                          </table> */}
            
            </center>
            <div class="card" >
            <form onSubmit={sendData} className="frm" novalidate> 
                <div class="mb-3">
                <label for="ItemID" class="form-label"><strong>Item ID</strong></label>
                <select name="itemID" class="form-label" aria-label="ItemID" placeholder="Item ID" onChange={(e) => {
                                    SetitemId(e.target.value)
                                }} >
                <option></option>
                {
                    getItemId.map(function (item) {
                        return <option key={item} value={item}>{item}</option>
                    })
                }
                
                
            </select>    
       
        </div>
        

        <div class="mb-3">
        <label for="ItemStatus" class="form-label"><strong>Item Name</strong></label>
                <select name="itemName" class="form-control" aria-label="ItemName" placeholder="Item Name" onChange={(e) => {
                                    SetitemName(e.target.value)
                                }} required>
            <option> </option>
            {
                getItemName.map(function (item) {
                    return <option key={item} value={item}>{item}</option>
                })
            }
        </select>
        </div>
<div class="mb-3">
          <label for="Quantity" class="form-label"><strong>Quantity</strong></label>
          <input id="Quantity" type="text" class="form-control"id="Quantity" placeholder="Quantity"   onChange ={(e)=>{

Setquantity(e.target.value);
}} required></input>
          </div>
          <div className="row">
                    <div className="col">
                    <label for="Quantity" class="form-label"><strong>Contact Number</strong></label>
                        <input Type="text" className="form-control" id="" placeholder=" Contact No"
                        onChange={(e)=>{
                            SetcontactNo(e.target.value);
                        }}required/>
                        </div>
          {/* <div class="mb-3">
          <label for="RequestTime" class="form-label"><strong>Time</strong></label>
          <input type="time" class="form-control" id="RequestTime" onChange ={(e)=>{

Setcontactnumber(e.target.value); */}
{/* // }}required></input> */}
          {/* </div>

          <div class="mb-3">
          <label for="RequestDate" class="form-label"><strong>Request Date</strong></label>
          <input type="date" class="form-control" id="RequestDate" onChange ={(e)=>{

Setodate(e.target.value); */}

          </div>
          <div class="mb-3">
          <label for="Message" class="form-label"><strong>Address</strong></label>
          <textarea className="form-control" rows="3" id="Address" placeholder="Address"onChange ={(e)=>{

Setaddress(e.target.value);
}}required></textarea>
          </div>
          <center>


          <div class="inner">
          <button type="submit" class="btn btn-primary"> Send</button></div>
          <div class="inner">
          <button type="reset" class="btn btn-danger"> Reset</button></div>
          </center>
          </form>
      </div>
      </div>
      </div>:supplier.role === "manager"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:<div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
      </div>
    </div>}
      </>
    )

}