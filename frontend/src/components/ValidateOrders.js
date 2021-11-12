import React, {useState, useEffect, Component} from "react";
import './Order.css';
import OrderHeader from "./OrderHeaders/OrderHeader";
import axios from "axios";
import { useParams , useHistory} from "react-router-dom"
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import Blink from 'react-blink-text';



const ValidateOrders = () => {    
    const {id} = useParams();

    const { register, handleSubmit, formState: { errors }} = useForm();

    const [_id, Set_id] = useState("")
    const [itemId, SetitemId] = useState("");
    const [itemName, SetitemName] = useState("");
    const [quantity, Setquality] = useState("");
    const [contactNo, Setcontactno] = useState("");
    const [address, Setaddress] = useState("");
    const [status, Setstatus] = useState("");

    const [orderrequest,setValidateOrder] = useState([]);

    const [availableitems, setAvailabeItems] = useState([]);

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
        
        axios.get(`http://localhost:8070/Order/getorder/${id}`).then((res) => {
            
            setValidateOrder(res.data.orderrequest)

            Set_id(res.data.orderrequest._id)
            SetitemId(res.data.orderrequest.itemId)
            SetitemName(res.data.orderrequest.itemName)
            Setquality(res.data.orderrequest.quantity)
            Setcontactno(res.data.orderrequest.contactNo)
            Setaddress(res.data.orderrequest.address)
            Setstatus(res.data.orderrequest.status)
            
        }).catch((e) => {
            console.log(e);
            console.log(id);
        })



    },[])

    useEffect(() => {
      const getRequest = async()=>{
        const res = await axios.get('/stkitem/stkproview').then((res) => {
          if (res.data.length > 0) {
            setAvailabeItems(res.data);
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



    function Acceptorder(e){
        //e.preventDefault();
        
        const newAcceptOrder = {

            _id,
            itemId,
            itemName,
            quantity,
            contactNo,
            address,
            status
        }

    
    axios.post("http://localhost:8070/Order/accept",newAcceptOrder).then((willaccept)=>{

            if(willaccept){
      axios.delete(`http://localhost:8070/Order/deleteorder/${id}`).then(()=>{
        
      if (willaccept) {
        swal({
          title: "The Order Request has been Accepted!",
          icon:  "success",
          type: "success"
        }).then(function(){
          window.location.href="/Order/acceptedorders";

         })
      } else {
        swal("Request Is Not Accepted");
      }
    });
  }
});
        
      }

    function Declineorder(e){
        //e.preventDefault();


    const newDeclineOrder = {

            _id,
            itemId,
            itemName,
            quantity,
            contactNo,
            address,
            status
        }

    axios.post("http://localhost:8070/Order/decline",newDeclineOrder).then((willdecline)=>{
        
      if(willdecline){
          axios.delete(`http://localhost:8070/Order/deleteorder/${id}`).then(()=>{
            
            if (willdecline) {
              swal({
                title: "The Order Request has been Declined!",
                icon:  "success",
                type: "success"
              }).then(function(){
                window.location.href="/Order/declinedorders";
               })
            } else {
              swal("Request Is Not Declined");
            }
          });
        }
      });

    }

    


    return(
      <>
      <OrderHeader />
      <div className="vlft2">
      <div className="vcard" >

          <h3><center> Available Items </center></h3>
          <br></br>

          <div className="vcard4" >
          <table className="table table-bordered">
          <table className="table table-hover" >

            <thead>
              <tr>
                <th><center> Item ID </center></th>
                <th><center> Item Name </center></th>
                <th><center> Quantity </center></th>
                <th></th>
                    
              </tr>
            </thead>
            <tbody>
              {
                            
                  availableitems.map(function (f) {
                  return <tr>
                    <td ><center> {f.itemID} </center></td>
                    <td ><center> {f.itemName} </center></td>
                    <td ><center> {f.quantity} </center></td>
                  </tr>
        
                })
              }
                            
            </tbody>
                    
          </table>
          </table>
          </div>
      </div>
      <br></br>

      <div className="vcard" >
        <div className= "container">

          <h3><center>Validate Order Request</center></h3>
          <br></br>

          <form className="frm" className="needs-validation" novalidate>

                <div className="row">
                <div className="col">
                <label for="orderId" className="form-label"><strong>Order ID</strong></label>
                <input id="orderId" readOnly="readonly" defaultValue={orderrequest._id} type="text" className="form-control" 
                onChange={(e) => {

                  Set_id(e.target.value)
                  }}/>
                </div>

                <div className="col">
                <label for="itemId" className="form-label"><strong>Item ID</strong></label>
                <input id="itemId" readOnly="readonly" defaultValue={orderrequest.itemId} type="text" className="form-control" 
                onChange={(e) => {

                  SetitemId(e.target.value)
                  }}/>
                </div>
                </div>
                <br></br> 

                <div className="form-group">
                <label for="itemName" className="form-label"><strong>Item Name</strong></label>
                <input type="text" readOnly="readonly" defaultValue={orderrequest.itemName} id="itemName" className="form-control"
                onChange ={(e)=>{

                  SetitemName(e.target.value);
                  }}/>
                </div>

                <div className="form-group">
                <label for="address" className="form-label"><strong>Address</strong></label>
                <input type="text" readOnly="readonly" defaultValue={orderrequest.address}  id="address" className="form-control"  
                onChange ={(e)=>{

                  Setaddress(e.target.value);
                  }}/>
                </div>
                <br></br>

                <div className="row">
                <div className="col">
                <label for="quantity" className="form-label"><strong>Quantity</strong></label>
                <input type="text" readOnly="readonly" defaultValue={orderrequest.quantity} id="quantity" className="form-control"
                onChange ={(e)=>{

                  Setquality(e.target.value);
                  }}/>
                </div>

                <div className="col">
                <label for="contactNo" className="form-label"><strong>Contact No</strong></label>
                <input type="text" readOnly="readonly" defaultValue={orderrequest.contactNo}  id="contactNo" className="form-control"  
                onChange ={(e)=>{

                  Setcontactno(e.target.value);
                  }}/>

                </div>
                </div>
                <br></br>

                <div className="form-group">
                <label for="status" className="form-label" ><strong>Status</strong></label>
                <input type="string" {...register("status", { required:true })} id="status" className="form-control"
                onChange ={(e)=>{

                  Setstatus(e.target.value);
                  }}/>
                  {errors.status && (<Blink color='red' text='** Required!! **' fontSize='20'/>)}
                  
                </div>
                <br></br>

                
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <center><button type="submit"  class="btn btn-outline-primary btn-lg" onClick={handleSubmit(() =>  Acceptorder())}>Accept</button></center>
                <center><button type="submit"  class="btn btn-outline-danger btn-lg" onClick={handleSubmit(() =>  Declineorder())}>Decline</button></center>
                </div>

                <br></br>
                <br></br>

            </form>
    
        </div>
      </div>
    </div>
    </>


    )
                

}
     
export default ValidateOrders;