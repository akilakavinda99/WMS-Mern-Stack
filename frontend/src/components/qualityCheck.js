import React,{useState, useEffect} from "react";
import axios from "axios";
import Header from '../components/InboundHeaders/Header'
import './inboundcss.css';
import { useParams } from 'react-router-dom'
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import {useHistory} from 'react-router-dom';

export default function QualityCheck(){

    const { id } = useParams();

    const { register, handleSubmit, formState: { errors }} = useForm();
    const [itemID, SetitemID] = useState("");
    const [itemName, SetitemName] = useState("");
    const [quantity, Setquantity] = useState("");
    const [batchNo, SetbatchNo] = useState("");
    const [receivedTime, SetreceivedTime] = useState("");
    const [receivedDate, SetreceivedDate] = useState("");
    const [description, Setdescription] = useState("");

    const [inbounditems, Setinbounditems] = useState([]);

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
        //fetching the inbounditem object that matching with the ID from the DB
        axios.get(`http://localhost:8070/inbound/get/${id}`).then((res) => {

            Setinbounditems(res.data.inbounditems)

            SetitemID(res.data.inbounditems.itemID)
            SetitemName(res.data.inbounditems.itemName)
            Setquantity(res.data.inbounditems.quantity)
            SetbatchNo(res.data.inbounditems.batchNo)
            SetreceivedTime(res.data.inbounditems.receivedTime)
            SetreceivedDate(res.data.inbounditems.receivedDate)
           

        }).catch((e) => {
            console.log(e);
            console.log(id);
        })

    },[])


    function qualityFailed(e){
        // e.preventDefault()

        const newQualityfaileditem = {
            itemName,
            itemID,
            quantity,
            batchNo,
            description
        }
        
        axios.post("http://localhost:8070/failed/add", newQualityfaileditem).then(()=>{
            swal("Quality Failed", "Item Removed From Inbound", "error");
            axios.delete(`http://localhost:8070/inbound/delete/${id}`).then(()=>{
                ;setTimeout(function(){
                    window.location = "/inbound/qualityfailed"
                   },1000);
    })
            
        }).catch((e) => {
          alert("error");
      })
      
     

    }

    function qualityPassed(e){
        // e.preventDefault()

        const newQualitypasseditem = {
            itemName,
            itemID,
            quantity,
            batchNo,
            description,
            receivedDate,
            receivedTime
        }
        
        axios.post("http://localhost:8070/passed/add", newQualitypasseditem).then(()=>{
            swal("Quality Check Passed", "", "success");

            axios.delete(`http://localhost:8070/inbound/delete/${id}`).then(()=>{
                ;setTimeout(function(){
                    window.location = "/inbound/qualitypassed"
                   },1000);
    })
            
        }).catch((e) => {
          alert("error");
      })
      
     

    }






    return(
        <>{supplier.role === "manager"?<>
        <Header/>
        
        <div class="lftAK">
        <center><h1 className="h1tag"><strong> Quality Check </strong></h1></center>
<div class="cardAK" >
        <div class= "container">
        <div class="scroll">
        
             <form  className="frm" className="needs-validation" novalidate>
                <div class="mb-3">
                <label for="Itemname" class="form-label"><strong>Item Name</strong></label>
                <select class="form-select" aria-label="Item Name" onChange={(e) => {
                                    SetitemName(e.target.value)
                                }}required >
        <option selected>{itemName}</option>
  

        
        </select>
        </div>

        <div class="mb-3">
        <label for="Itemname" class="form-label"><strong>Item ID</strong></label>
                <select class="form-select" aria-label="Item Id" onChange={(e) => {
                                    SetitemID(e.target.value)
                                }} required>
        <option selected>{itemID}</option>
  
                                   
       
        </select>
        </div>





   <div class="mb-3">
          <label for="Itemname" class="form-label"><strong>Quantity</strong></label>
          <input id="quantity" type="text" readOnly="readonly" class="form-control" defaultValue={inbounditems.quantity}
        onChange ={(e)=>{

Setquantity(e.target.value);
}} required></input>

          </div>

          <div class="mb-3">
          <label for="Itemname" class="form-label"><strong>BatchNo</strong></label>
          <input type="string" readOnly="readonly" class="form-control" id="batchNo" defaultValue={inbounditems.batchNo} onChange ={(e)=>{

SetbatchNo(e.target.value);
}}required></input>
          </div>
          <div class="mb-3">
          <label for="Itemname" class="form-label"><strong>ReceivedDate</strong></label>
          <input id="quantity" type="text" readOnly="readonly" class="form-control" defaultValue={inbounditems.receivedDate} onChange ={(e)=>{

SetreceivedDate(e.target.value);}}
     required></input>

          </div>

          <div class="mb-3">
          <label for="Itemname" class="form-label"><strong>receivedTime</strong></label>
          <input id="quantity" type="text" readOnly="readonly" class="form-control" defaultValue={inbounditems.receivedTime} onChange ={(e)=>{

SetreceivedDate(e.target.value);}}
     required></input>

          </div>

         

          <div class="mb-3">
          <label for="receivedDate"  class="form-label"><strong>Description</strong></label>
          <input type="string" {...register("description", { required:true })} class="form-control" id="receivedDate" onChange ={(e)=>{
Setdescription(e.target.value);
}}/>

{errors.description && (<p className="alert"  id="bord">Required!!</p>)}
          </div>
          

         
          
        
 <button type="button"  onClick={handleSubmit(() =>  qualityPassed())}class="btn btn-success"id="bbb">Quality Passed</button>
       <button type="button" onClick={handleSubmit(() =>  qualityFailed())} class="btn btn-danger" id="bb">Quality Failed</button>
       
      </form>
      </div>
      </div>
      </div>
      </div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}
      </>
    )



    

}