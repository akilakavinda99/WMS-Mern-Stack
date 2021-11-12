import React,{useState, useEffect} from "react";
import axios from "axios";
import Header from './InboundHeaders/Header'
import './inboundcss.css';
import { useParams } from 'react-router-dom'
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import {useHistory} from 'react-router-dom';

export default function ReturnItemsInbound(){

    const { id } = useParams();

    const { register, handleSubmit, formState: { errors }} = useForm();

    const [itemID, SetitemID] = useState("");
    const [itemName, SetitemName] = useState("");
    const [quantity, Setquantity] = useState("");
    const [batchNo, SetbatchNo] = useState("");
    const [description, Setdescription] = useState("");
    const [address, Setaddress] = useState("");
    const [qualityFailed, SetqualityFailed] = useState([]);
    
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
        axios.get(`http://localhost:8070/failed/get/${id}`).then((res) => {

            SetqualityFailed(res.data.faileditems)

            SetitemID(res.data.faileditems.itemID)
            SetitemName(res.data.faileditems.itemName)
            Setquantity(res.data.faileditems.quantity)
            SetbatchNo(res.data.faileditems.batchNo)
            Setdescription(res.data.faileditems.description)
           
           

        }).catch((e) => {
            console.log(e);
            console.log(id);
        })

    },[])

    function Return(e){
        // e.preventDefault()

        const newReturnitems = {
            itemName,
            itemID,
            quantity,
            batchNo,
            description,
            address
        }
        
        axios.post("http://localhost:8070/return/add", newReturnitems).then(()=>{
            swal("Quality Failed", "Item Removed From Inbound", "error");
            axios.delete(`http://localhost:8070/failed/delete/${id}`).then(()=>{
                ;setTimeout(function(){
                    window.location = "/inbound/qualityfailed"
                   },1000);
    })
            
        }).catch((e) => {
          alert("error");
      })
      
     

    }

    return(
        <>{supplier.role === "manager"?<>
        
        <Header/>
        
        <div class="lft">
        <center><h1 ><strong> Returning Items </strong></h1></center>
<div class="card" >
        <div class= "container">
        <div class="scroll">
        
             <form  className="frm" className="needs-validation" novalidate>
                <div class="mb-3">
                <label for="Itemname" class="form-label"><strong>Item Name</strong></label>
                <input id="quantity" type="text" readOnly="readonly" class="form-control" defaultValue={qualityFailed.itemName}
        onChange ={(e)=>{

Setquantity(e.target.value);
}} required></input>
        </div>

        <div class="mb-3">
        <label for="Itemname" class="form-label"><strong>Item ID</strong></label>
        <input id="quantity" type="text" readOnly="readonly" class="form-control" defaultValue={qualityFailed.itemID}
        onChange ={(e)=>{

SetitemID(e.target.value);
}} required></input>
        </div>





   <div class="mb-3">
          <label for="Itemname" class="form-label"><strong>Quantity</strong></label>
          <input id="quantity" type="text" readOnly="readonly" class="form-control" defaultValue={qualityFailed.quantity}
        onChange ={(e)=>{

Setquantity(e.target.value);
}} required></input>

          </div>

          <div class="mb-3">
          <label for="Itemname" class="form-label"><strong>BatchNo</strong></label>
          <input type="string" readOnly="readonly" class="form-control" id="batchNo" defaultValue={qualityFailed.batchNo} onChange ={(e)=>{

SetbatchNo(e.target.value);
}}required></input>
          </div>

          <div class="mb-3">
          <label for="Itemname" class="form-label"><strong>BatchNo</strong></label>
          <input type="string" readOnly="readonly" class="form-control" id="batchNo" defaultValue={qualityFailed.description} onChange ={(e)=>{

Setdescription(e.target.value);
}}required></input>
          </div>
        

         
         

          <div class="mb-3">
          <label for="receivedDate"  class="form-label"><strong>Address</strong></label>
          <input type="string" {...register("description", { required:true })} class="form-control" id="receivedDate" onChange ={(e)=>{
Setaddress(e.target.value);
}}/>

{errors.description && (<p className="alert"  id="bord">Required!!</p>)}
          </div>
          

         
          
        
        <center><button type="button"  onClick={handleSubmit(() =>  Return())}class="btn btn-success">Quality Passed</button></center>
       
       
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