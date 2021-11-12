import React,{useState, useEffect} from "react";
import './AddSupplier.css';
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import SupplierHeader2 from "./SupHeaders/SupplierHeader2";
import swal from "sweetalert";
import { Button } from "@material-ui/core";

const AcceptSupOrders = () =>{
  let history = useHistory();
  let path = '/supplier/login';
  const {id} = useParams();

  const [userId, setUserID] = useState("");
  const [nicno, setNicNo] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [requestdate, setRequestdate] = useState("");
  const [bdate, setBdate] = useState("");

  const [neworders, setNewOrders] = useState([]);
  const [supplier, setSupplier] = useState([]);

  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get('/supplier/supplierprofile').then((res)=>{
      setSupplier(res.data)
      setUserID(res.data._id)
      setNicNo(res.data.nicno)
      }).catch(()=>{
        history.push(path);
        swal({title: "unauthorized",
        text: "Please Login First",
        icon: "warning"} ); 
    })
  }
    fetchUser();
  },[]);

  useEffect(()=>{
    axios.get(`http://localhost:8070/supplier/getneworder/${id}`).then((res)=>{

    setNewOrders(res.data.neworders)
    setItemName(res.data.neworders.itemName)
    setQuantity(res.data.neworders.quantity)
    setRequestdate(res.data.neworders.requestdate)
    setBdate(res.data.neworders.bdate)
    

    }).catch((e)=>{
      console.log(e);
      console.log(id);
    })
  },[])

  function sendData(e){
    e.preventDefault();

    const newMySupOrder = {
      userId,
      nicno,
      itemName,
      quantity,
      requestdate,
      bdate
    }
    axios.post("http://localhost:8070/supplier/addmyorders",newMySupOrder).then((willAccept)=>{
      if(willAccept){
        swal({
          title: "Success",
          text: "You Successfully accepted supply order",
          icon:  "success",
          type: "success"
        }).then(function(){
          //add my sup orders location
          window.location.href="/supplier/myorders"
         })
        } else{
           swal("Order not accept!");
         }
    });
    axios.delete(`http://localhost:8070/supplier/delerteneworde/${id}`,newMySupOrder)
  }

  return(
    <>
    <SupplierHeader2/>
    <div className="addsuplft">
    <div className="addsupcard">
    <div className="container ">
    <br/>
    <h2 style={{ fontFamily: "Arial,Helvetica,sans-serif", fontWeight: "bold" }}>Accept Order</h2>
    <br/>

    <form className="needs-validation" novalidate>
    <div className="form-floating mb-3">
        <input type="text" className="form-control" id="userId" defaultValue={supplier.nicno}
               onChange={(e) => {setUserID(e.target.value);}} 
            readOnly/>
            <label for="userId">User Nic No</label>
      </div>
    
      <div className="form-floating mb-3">
      <input type="text" className="form-control" id="Materialname" defaultValue={neworders.itemName}
             onChange={(e) => {setItemName(e.target.value);}} 
             readOnly/>
             <label for="Materialname">Material Name</label>
      </div>

      <div className="form-floating mb-3">
      <input type="text" className="form-control" id="quantity" defaultValue={neworders.quantity}
             onChange={(e) => {setQuantity(e.target.value);}} 
             readOnly/>
             <label for="quantity">Quantity</label>
      </div>

      <div className="form-floating mb-3">
      <input type="text" className="form-control" id="requestdate" defaultValue={neworders.requestdate}
             onChange={(e) => {setRequestdate(e.target.value);}} 
             readOnly/>
             <label for="requestdate">Request Date</label>
      </div>

      <div className="form-floating mb-3">
      <input type="text" className="form-control" id="beforedate" defaultValue={neworders.bdate}
             onChange={(e) => {setBdate(e.target.value);}} 
             readOnly/>
             <label for="beforedate">Before date</label>
      </div>
      <br/>
      <button type="submit" onClick={sendData}  className="btn btn-success" id="regsubmit">Accept</button>
      <div className="btncancel">
      <Link to={"/supplier/allneworders"} ><Button  variant="contained" > Cancel </Button></Link>
      </div>

    </form>
    <br/>
    </div>
    </div>
    </div>
    </>
  )
}
export default AcceptSupOrders;