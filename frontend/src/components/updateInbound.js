import React,{ useState, useEffect } from 'react';
 import './update.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

const EditinboundView = () => {
    const history = useHistory();

    const { id } = useParams();

    const [itemID, SetitemID] = useState("");
    
    const [itemName, SetitemName] = useState("");
    const [quantity, Setquantity] = useState("");
    const [batchNo, SetbatchNo] = useState("");
    const [receivedTime, SetreceivedTime] = useState("");
    const [receivedDate, SetreceivedDate] = useState("");

    const [inbounditems, Setinbounditems] = useState([]);

    const [getItemId, setgetItemId] = useState([]);
    const [getItemName, setgetItemName] = useState([]);

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

    },[])



    function updateData(e) {

        e.preventDefault();


        const newInboundItem = {
            itemID, itemName, quantity, batchNo, receivedTime, receivedDate
        }


        axios.put(`http://localhost:8070/inbound/update/${id}`, newInboundItem).then(() => {
            swal("Details Updated", "", "success");setTimeout(function(){
                window.location = "/inbound/view"
               },1000);

           

        }).catch((e) => {
            alert("error");
        })
    


}
    

                    

    return (<>{supplier.role === "manager"?<>
    <div class="lftAK">
    <div class="content-box" >
    
            <div class= "container"> <i onClick={() => { history.goBack(); }} class="bi-x-circle-fill" ></i>
            
            <center><h3 class= "container">  Edit Inbound Item </h3></center>
          
                 <form  className="frm" onSubmit={updateData} novalidate>
                    <div class="mb-3">
                    <label for="Itemname" class="form-label"><strong>Item Name</strong></label>
                    <select class="form-select" aria-label="Item Name" onChange={(e) => {
                                        SetitemName(e.target.value)
                                    }}required readonly>
            <option >{itemName}</option>
                                    {
                                        getItemName.map(function (item) {
                                            if (inbounditems.itemName !== item) {
                                                return <option key={item} value={item}>{item}</option>
                                            }
                                           
                                        })
                                    }
            
            </select>
            </div>
    
            <div class="mb-3">
            <label for="Itemname" class="form-label"><strong>Item ID</strong></label>
                    <select class="form-select" defaultValue={inbounditems.itemID} aria-label="Item Id" onChange={(e) => {
                                        SetitemID(e.target.value)
                                    }} required>
            <option >{itemID}</option>
       
       {
           getItemId.map(function (item) {
            if (inbounditems.itemID !== item) {
               return <option key={item} value={item}>{item}</option>
            }
           })
       }
            
            </select>
            </div>
    
    
    
    
    
       <div class="mb-3">
              <label for="Itemname" class="form-label"><strong>Quantity</strong></label>
              <input id="quantity"  defaultValue={inbounditems.quantity}   title="Please Enter in the given Format Eg-10KG " type="text" class="form-control"
            onChange ={(e)=>{
    
    Setquantity(e.target.value);}} 
    required ></input>
    
              </div>
    
              <div class="mb-3">
              <label for="Itemname" class="form-label"><strong>BatchNo</strong></label>
              <input type="string" defaultValue={inbounditems.batchNo}   pattern="[0-9]+BNM"  title="Please Enter in the given Format Eg-123BNM " class="form-control" id="batchNo" onChange ={(e)=>{
    
    SetbatchNo(e.target.value);
    }}required></input>
              </div>
    
              <div class="mb-3">
              <label for="receivedTime" class="form-label"><strong>Recieved Time</strong></label>
              <input type="time" defaultValue={inbounditems.receivedTime} class="form-control" id="receivedTime" onChange ={(e)=>{
    
    SetreceivedTime(e.target.value);
    }}required></input>
              </div>
    
              <div class="mb-3">
              <label for="receivedDate" class="form-label"><strong>Recieved Date</strong></label>
              <input type="date" defaultValue={inbounditems.receivedDate} class="form-control" id="receivedDate" onChange ={(e)=>{
    
    SetreceivedDate(e.target.value);
    }}required></input>
              </div>
            
           
            <center><button type="submit" class="btn btn-dark">Update</button></center>
          </form>
          </div>
          </div>
          </div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}
          </>
    );
}

export default EditinboundView;



