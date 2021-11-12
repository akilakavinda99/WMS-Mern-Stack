import React,{useState, useEffect} from "react";
import axios from "axios";
import Header from '../components/InboundHeaders/Header'
import './inboundcss.css';
// import './Suppliers.css'

// import 'intro.js/introjs.css';
import swal from "sweetalert";
import {useHistory} from 'react-router-dom';

export default function Addinbound(){
    

    
    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/supplier/supplierprofile';
    let path3 = '/agent/agentprofile';

    const [supplier, setSupplier] = useState([]);

    const [itemID, SetitemID] = useState("");
    const [itemName, SetitemName] = useState("");
    const [quantity, Setquantity] = useState("");
    const [batchNo, SetbatchNo] = useState("");
    const [receivedTime, SetreceivedTime] = useState("");
    const [receivedDate, SetreceivedDate] = useState("");

    const [getItemId, setgetItemId] = useState([]);
    const [getItemName, setgetItemName] = useState([]);

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
    


    useEffect(()=>{

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
    

    function sendData(e){
        e.preventDefault()

        const newInboundItem = {
            itemName,
            itemID,
            quantity,
            batchNo,
            receivedTime,
            receivedDate
        }
        
        axios.post("http://localhost:8070/inbound/add", newInboundItem).then(()=>{
            swal("SUccess!", "Item Added To Inbound!", "success");setTimeout(function(){
                window.location = "/inbound/view"
               },1000);
            
        }).catch((e) => {
          alert("error");
      })
      
     

    }

  

    

    return(
        <>{supplier.role === "manager"?<>
   
        <Header/>
       
        
        <div class="lftAK"> <center><h1 ><strong> Add to Inbound </strong></h1></center>
<div class="cardAK" >
        <div class= "container">
        
             <form onSubmit={sendData} className="frm" novalidate>
                <div class="mb-3">
                <label for="Itemname" class="form-label" data-intro='Hello step one!'><strong>Item Name</strong></label>
                <select class="form-select" aria-label="Item Name" onChange={(e) => {
                                    SetitemName(e.target.value)
                                }}required >
       <option ></option>
                                    {
                                        getItemName.map(function (item) {
                                            return <option key={item} value={item}>{item}</option>
                                        })
                                    }

        
        </select>
        </div>

        <div class="mb-3">
        <label for="Itemname" class="form-label"><strong>Item ID</strong></label>
                <select class="form-select" aria-label="Item Id" onChange={(e) => {
                                    SetitemID(e.target.value)
                                }} required>
        <option ></option>
       
                                    {
                                        getItemId.map(function (item) {
                                            return <option key={item} value={item}>{item}</option>
                                        })
                                    }
                                   
       
        </select>
        </div>


        {/* pattern="[0-9]+kg"  */}


   <div class="mb-3">
          <label for="Itemname" class="form-label"><strong>Quantity</strong></label>
          <input id="quantity" type="text" placeholder="10Kg"   title="Please Enter in the given Format Eg-10kg " class="form-control"
        onChange ={(e)=>{

Setquantity(e.target.value);
}} required></input>

          </div>

          <div class="mb-3">
          <label for="Itemname" class="form-label"><strong>BatchNo</strong></label>
          <input type="string" class="form-control" placeholder="123BNM"  pattern="[0-9]+BNM"  title="Please Enter in the given Format Eg-123BNM " id="batchNo" onChange ={(e)=>{

SetbatchNo(e.target.value);
}}required></input>
          </div>

          <div class="mb-3">
          <label for="receivedTime" class="form-label"><strong>Recieved Time</strong></label>
          <input type="time" class="form-control" id="receivedTime" onChange ={(e)=>{

SetreceivedTime(e.target.value);
}}required></input>
          </div>

          <div class="mb-3">
          <label for="receivedDate" class="form-label"><strong>Recieved Date</strong></label>
          <input type="date" class="form-control" id="receivedDate" onChange ={(e)=>{

SetreceivedDate(e.target.value);
}}required></input>
          </div>
        
       
        <center><button type="submit" class="btn btn-dark" id="sbm">Submit</button></center>
      </form>
      </div>
      </div>
      </div>
</>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}
      </>
    )



 

}