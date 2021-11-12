import React, {useState, useEffect , Component} from "react";
import './Order.css';
import OrderHeader from "./OrderHeaders/OrderHeader";
import axios from "axios";
import { useParams , useHistory} from "react-router-dom"
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import Blink from 'react-blink-text';




const ViewRmaterial = () => {    
    const {id} = useParams();

    const { register, handleSubmit, formState: { errors }} = useForm();

    const [_id, Set_id] = useState("")
    const [itemName, SetMaterialName] = useState("");
    const [quantity, Setquantity] = useState("");
    const [requestdate, Setrequestdate] = useState("");
    const [bdate, Setbeforedate] = useState("");


    const [rawmaterialreq,SetValidateOrder] = useState([]);

    const JSJoda = require('js-joda');
    const LocalDate = JSJoda.LocalDate;     

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
        const res = await axios.get(`/Order/getR/${id}`).then((res) => {
            
            SetValidateOrder(res.data.rawmaterialreq)

            Set_id(res.data.rawmaterialreq._id)
            SetMaterialName(res.data.rawmaterialreq.itemName)
            Setquantity(res.data.rawmaterialreq.quantity)
            Setrequestdate(res.data.rawmaterialreq.requestdate)
            Setbeforedate(res.data.rawmaterialreq.bdate)
            
        }).catch(() => {
          history.push(path2);
          swal({title: "Unauthorized",
          text: "Your not an Manager",
          icon: "warning"} ); 
        })
      }

      getRequest();
    },[])




    function sendData(e){
        //e.preventDefault();
        
        const newRequestMaterial = {

            _id,
            itemName,
            quantity,
            requestdate,
            bdate
        }

    
    axios.post("http://localhost:8070/Order/request",newRequestMaterial).then((willrequest)=>{
        if (willrequest) {
          swal({
            title: "Order Request has been Accepted!",
            text: "You can Continue with Your Accepted Orders.",
            icon:  "success",
            type: "success"
          }).then(function(){
            window.location.href="/Order/viewreq";
           })
        } else {
          swal("Request Is Not Sent!");
        }
      });
      
      axios.delete(`http://localhost:8070/Order/deleteR/${id}`,newRequestMaterial)
    }  

    
    return(
      <>
      <OrderHeader />
      <div className="vlft1">
      <div className="vcard" >
      <div className= "container">

          <h1><center>Request Raw Material</center></h1>
          <br></br>
          
          <form className="frm" className="needs-validation" novalidate>

              <div className="form-group">

              <label for="requestID" className="form-label"><strong>Request ID</strong></label>
              <input id="requestID" readOnly="readonly" defaultValue={rawmaterialreq._id} type="text" className="form-control" 
              onChange={(e) => {

                Set_id(e.target.value)
                  }}/>


              </div>
              <br></br>

              <div className="form-group">

              <label for="MaterialName" className="form-label"><strong>Material Name</strong></label>
              <input id="MaterialName" readOnly="readonly" defaultValue={rawmaterialreq.itemName} type="text" className="form-control" 
               onChange={(e) => {

                  SetMaterialName(e.target.value)
                  }}/>

          
              </div>
              <br></br>

              <div className="form-group">

              <label for="quantity" className="form-label"><strong>Quantity</strong></label>
              <input type="text" readOnly="readonly" defaultValue={rawmaterialreq.quantity} id="quantity" className="form-control"
              onChange ={(e)=>{

                Setquantity(e.target.value);

              }}/>

              </div>
              <br></br>

              <div className="form-group">

              <label for="beforedate" className="form-label"><strong>Before Date</strong></label>
              <input type="text" readOnly="readonly" defaultValue={rawmaterialreq.bdate}  id="beforedate" className="form-control"  
              onChange ={(e)=>{

                  Setbeforedate(e.target.value);

              }}/>

              </div>
              <br></br>

              <div className="form-group">

              <label for="requestdate" className="form-label"><strong>Request Date</strong></label>
              <input type="date" {...register("requestdate", { required:true })}  id="requestdate" className="form-control"
              onChange ={(e)=>{

                  Setrequestdate(e.target.value);

                  }}required/>
                  {errors.requestdate && (<Blink color='red' text='** Required!! **' fontSize='20'/>)}

              </div>
              <br></br>
              <br></br>
                
                <center><button type="button" class="btn btn-primary btn-lg" onClick={handleSubmit(() => sendData())}>Request</button></center>



          </form>
    
      </div>
      </div>
      </div>
      </>


        )
                

}
     
 

export default ViewRmaterial;