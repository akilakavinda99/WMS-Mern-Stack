import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './outbound.css';
import './outbound.scss';
import swal from 'sweetalert';
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import { useParams} from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import Nav from './Nav';
import OutboundSidebar from './OutboundSidebar';
import {useHistory} from 'react-router-dom';

export default function AddtoShippingLables() {
    
    const {id} = useParams();
    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/supplier/supplierprofile';
    let path3 = '/agent/agentprofile';
    const [TrackingNumber, setTrackingNumber] = useState('');
    const [imageUrl, setImageUrl] = useState('');
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

    //Qr code generate
    const generateQrCode = async () => {
        try {
              const response = await QRCode.toDataURL(TrackingNumber);
              setImageUrl(response);
              console.log(response);
        }catch (error) {
          console.log(error);
        }
      } 
    
    const [_id, Set_id] = useState("");
    const [itemId, SetitemId] = useState("");
    const [itemName, setitemName] = useState("");
    const [address, setaddress] = useState("");
    const [contactNo, setcontactno] = useState("");
    const [quantity, setquality] = useState("");
    const [trackingnumber, settrackingnumber] = useState("");
    const [shippingstatus, setshippingstatus] = useState("");
    const [orderc,setViewOrders] = useState([]);

    //Tracking number generate function
    function generateTrack(){

        const Track = uuidv4();
        document.getElementById('total').innerHTML = Track;
    }

    //Refresh page function
    function refreshPage() {
        window.location.reload(false);
      }

      useEffect(() => {
        
        //Fetching the accepted orders from the ID from the DB
        axios.get(`http://localhost:8070/order/get/${id}`).then((res) => {


            setViewOrders(res.data.orderc)

            Set_id(res.data.orderc._id)
            SetitemId(res.data.orderc.itemId)
            setitemName(res.data.orderc.itemName)
            setaddress(res.data.orderc.address)
            setcontactno(res.data.orderc.contactNo)
            setquality(res.data.orderc.quantity)
        
        }).catch((e) => {
            console.log(e);
        })

    },[])

    //Data sent to database function
    function sendDataA(e){
        e.preventDefault();
        
        const newAddtoshipping = {

            _id,
            itemId,
            itemName,
            address,
            contactNo,
            quantity,
            trackingnumber,
            shippingstatus
            
        }

    //Validation Warinings, delete order from accepeted orders and sent to new database and save
    swal({
        title: "Are you sure?",
        text: "Your Order is Dispatching",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willSent) => {
            if(willSent){
            axios.post("http://localhost:8070/addtoshipping/shipping", newAddtoshipping).then(()=>{
        if (willSent) {
          swal({
      title: 'Order has Dispatch!',
      text: 'You can Continue with Your Shipping Details.',
      icon:  "success",
      type: 'success'
    }).then(function() {
        window.location.href = "/Tracking";
    })  
        } else {
          swal("The Order is Not Added to Dispatch!",);
        }
      });
    }
});
      
      axios.delete(`http://localhost:8070/order/delete/${id}`,newAddtoshipping)
    }

    return(
        <div>{supplier.role === "manager"?<>
            <Nav/>
            <OutboundSidebar/>
        <div className="lft2"><FadeIn>
            <div className="cardadd2" >
            <div className="box1" >  
            <div className="cardaddq" ><div className="back">
            <div class="inner"><Link to={"/AllOrders"} ><button type="submit"  className="btn btn-danger">Go Back</button></Link></div></div>
            <h1><center>Dispatch Order</center></h1>
                <br></br>
                <FadeIn>   
                <form onSubmit={sendDataA}>
                    <div className="form-group mx-sm-3 mb-2">

                    <label for="orderId" class="form-label"><strong>Order ID</strong></label>
                    <input id="orderId" readOnly defaultValue={orderc._id} type="text" class="form-control" 
                    onChange={(e) => {

                        Set_id(e.target.value)
                        }}required />

                    </div>
                    <br></br>

                    <div className="form-group mx-sm-3 mb-2">

                    <label for="itemId" class="form-label"><strong>Item ID</strong></label>
                    <input id="itemId" readOnly defaultValue={orderc.itemId} type="text" class="form-control" 
                     onChange={(e) => {

                        SetitemId(e.target.value)
                        }}required />

                    </div>
                    <br></br>
    
                    <div className="form-group mx-sm-3 mb-2">
    
                    <label for="itemName" class="form-label"><strong>Item Name</strong></label>
                    <input type="text" readOnly defaultValue={orderc.itemName} id="itemName" class="form-control"
                    onChange ={(e)=>{
    
                        setitemName(e.target.value);
    
                    }}required/>
    
                    </div>
                    <br></br>
    
                    <div className="form-group mx-sm-3 mb-2">
    
                    <label for="quantity" class="form-label"><strong>Quantity</strong></label>
                    <input type="text" readOnly defaultValue={orderc.quantity} id="quantity" class="form-control"
                    onChange ={(e)=>{
    
                        setquality(e.target.value);
    
                    }}required/>
    
                    </div>
                    <br></br>
    
                    <div className="form-group mx-sm-3 mb-2">
    
                    <label for="contactNo" class="form-label"><strong>Contact No</strong></label>
                    <input type="text" readOnly defaultValue={orderc.contactNo}  id="contactNo" class="form-control"  
                    onChange ={(e)=>{
    
                        setcontactno(e.target.value);
    
                    }}required/>
    
                    </div>
                    <br></br>

                    <div className="form-group mx-sm-3 mb-2">
    
                    <label for="address" class="form-label"><strong>Address</strong></label>
                    <input type="text" readOnly defaultValue={orderc.address}  id="address" class="form-control"  
                    onChange ={(e)=>{

                        setaddress(e.target.value);

                    }}required/>
                    </div>
                    <br></br>

                    <div className="form-group mx-sm-3 mb-2">
    
                    <label for="Tracking Number" class="form-label"><strong>Tracking Number</strong></label>
                    <input type="text" id="Tracking Number" class="form-control" onChange ={(e)=>{

                    settrackingnumber(e.target.value);
                    }} required></input>
                    </div>
                    <br></br>

                    <div class="form-group mx-sm-3 mb-2">
                    <label for="ItemStatus" class="form-label"><strong>Order Status</strong></label>
                            <select class="form-select" aria-label="ItemStatus" onChange={(e) => {
                                                setshippingstatus(e.target.value)
                                            }} required>
                    <option selected></option>
                    <option >Order Shipped</option>
                    <option >Order Not Shipped</option>
                    </select>
                    </div><br></br>

                    <div class="row">
                    <div class="col">
                    <center>
                    <div class="inner"><button type="submit" className="btn btn-primary btn-lg">Add to Shipping</button></div>
                    </center>
                    </div>
                    </div>
                </form></FadeIn></div></div></div>
    <div className="cardadd3" >
    <div class="inner">
    <div class="box2">
    <div className="card3" >
    {/* Generate Tracking Number function call*/}
    <h2><center>Generate Tracking Number</center></h2>
    <center><form onSubmit={e => e.preventDefault()}>
    <br/> <br/> <br/> 
    <div class="box glowing">
    <div className = "box" id ="total"></div>
    </div><br/> 
    <button onClick={generateTrack} class="btn btn-primary btn-lg" >Generate Tracking Number</button> <br/><br/>
    <button type="reset" onClick={refreshPage} class="btn btn-danger btn-lg">  Reset</button></form>
    </center>
    </div></div>
    
    <div class="box3">
        <div className="card4" >
        <h2><center>Create Shipping Label</center></h2>
        <br/><br/> 
        <form onSubmit={e => e.preventDefault()}> 
        
        <div class="form-group mx-sm-3 mb-2">
          <label for="RequestDate" class="form-label"><strong>Tracking Number</strong></label>
          <input type="text" class="form-control" id="RequestDate" onChange ={(e)=>{setTrackingNumber(e.target.value)}}required></input>
          {/* Generate Qrcode */}
          <br/><center><div class="inner">
        <button variant="contained" class="btn btn-primary btn-lg" onClick={() => generateQrCode()}>Generate</button></div>
        <div class="inner">
        <button type="reset" class="btn btn-danger btn-lg"> Reset</button></div>
                            <br/><br/>
                            {/* Qrcode display and download function */}
                            {imageUrl ? (
                              <a href={imageUrl} download>
                                  <img src={imageUrl} alt="img" />
                              </a>) : null}
                              <div className="form-group mx-sm-3 mb-2">
                              </div>
                              </center>                   
        </div></form>
        </div>  </div></div> 
         </div></FadeIn>
        </div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}
        </div>
    )
}
