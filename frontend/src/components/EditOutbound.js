import React,{ useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import FadeIn from 'react-fade-in';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import OutboundSidebar from './OutboundSidebar';
import {useHistory} from 'react-router-dom';

const EditOutbound = () => {
    
    const { id } = useParams();
    
    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/supplier/supplierprofile';
    let path3 = '/agent/agentprofile';

    const [_id, Set_id] = useState("");
    const [itemId, SetitemId] = useState("");
    const [itemName, setitemName] = useState("");
    const [address, setaddress] = useState("");
    const [contactNo, setcontactno] = useState("");
    const [quantity, setquality] = useState("");
    const [trackingnumber, settrackingnumber] = useState("");
    const [shippingstatus, setshippingstatus] = useState("");
    const [orderf, Setoutboundorders] = useState([]);

    const [getstatus, setgetstatus] = useState([]);
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
        //Fetching the outbound orders from the ID from the DB
        axios.get(`http://localhost:8070/addtoshipping/get/${id}`).then((res) => {
            
            Setoutboundorders(res.data.orderf)

            Set_id(res.data.orderf._id)
            SetitemId(res.data.orderf.itemId)
            setitemName(res.data.orderf.itemName)
            setaddress(res.data.orderf.address)
            setcontactno(res.data.orderf.contactNo)
            setquality(res.data.orderf.quantity)
            settrackingnumber(res.data.orderf.trackingnumber)
            setshippingstatus(res.data.orderf.shippingstatus)
            
        }).catch((e) => {
            console.log(e);
        })

    },[])

    //Update function
    function updateData(e) {
        e.preventDefault();

        const newOutboundorder = {
            _id, itemId, itemName, address, contactNo, quantity, trackingnumber, shippingstatus
        }
        //Update confirmation and forwarding location
        swal({
            title: "Are you sure?",
            text: "The Order Will be Updated",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willUpdate) => {
                if(willUpdate){
                axios.put(`http://localhost:8070/addtoshipping/update/${id}`, newOutboundorder).then(() => {
            if (willUpdate) {
              swal({
          title: 'The Order has been Updated!',
          text: 'You can Continue with Your Orders.',
          icon:  "success",
          type: 'success'
        }).then(function() {
            window.location.href = "/Tracking";
        })  
            } else {
              swal("The Order is Not Updated",);
            }
          });
        }
    });
}
    
    return (

        <div>{supplier.role === "manager"?<>
            <Nav/>
            <OutboundSidebar/>
        <div className = "lft">
        <div className = "cardq">
        <center><FadeIn>
        <h1>Edit Order Details</h1>
        </FadeIn>
        </center><br/>
        <div class="carde" >
            {/* form on submit call function*/}
            <form onSubmit={updateData} className="frm" novalidate><FadeIn>
                  
                      <div className="form-group mx-sm-3 mb-2">

                    <label for="orderId" class="form-label"><strong>Order ID</strong></label>
                    <input id="orderId" readOnly defaultValue={orderf._id} type="text" class="form-control" 
                    onChange={(e) => {

                        Set_id(e.target.value)
                        }}required />

                    </div>
                    <br></br>

                    <div className="form-group mx-sm-3 mb-2">

                    <label for="itemId" class="form-label"><strong>Item ID</strong></label>
                    <input id="itemId" readOnly defaultValue={orderf.itemId} type="text" class="form-control" 
                     onChange={(e) => {

                        SetitemId(e.target.value)
                        }}required />

                    </div>
                    <br></br>
    
                    <div className="form-group mx-sm-3 mb-2">
    
                    <label for="itemName" class="form-label"><strong>Item Name</strong></label>
                    <input type="text" readOnly defaultValue={orderf.itemName} id="itemName" class="form-control"
                    onChange ={(e)=>{
    
                        setitemName(e.target.value);
    
                    }}required/>
    
                    </div>
                    <br></br>
    
                    <div className="form-group mx-sm-3 mb-2">
    
                    <label for="quantity" class="form-label"><strong>Quantity</strong></label>
                    <input type="text"  defaultValue={orderf.quantity} id="quantity" class="form-control"
                    onChange ={(e)=>{
    
                        setquality(e.target.value);
    
                    }}required/>
    
                    </div>
                    <br></br>
    
                    <div className="form-group mx-sm-3 mb-2">
    
                    <label for="contactNo" class="form-label"><strong>Contact No</strong></label>
                    <input type="text"  defaultValue={orderf.contactNo}  id="contactNo" class="form-control"  
                    onChange ={(e)=>{
    
                        setcontactno(e.target.value);
    
                    }}required/>
    
                    </div>
                    <br></br>

                    <div className="form-group mx-sm-3 mb-2">
    
                    <label for="address" class="form-label"><strong>Address</strong></label>
                    <input type="text"  defaultValue={orderf.address}  id="address" class="form-control"  
                    onChange ={(e)=>{

                        setaddress(e.target.value);

                    }}required/>
                    </div>
                    <br></br>

                    <div className="form-group mx-sm-3 mb-2">
    
                    <label for="Tracking Number" class="form-label"><strong>Tracking Number</strong></label>
                    <input type="text" id="Tracking Number" class="form-control" readOnly defaultValue={orderf.trackingnumber} onChange ={(e)=>{

                    settrackingnumber(e.target.value);
                    }} required></input>
                    </div>
                    <br></br>

                    <div class="form-group mx-sm-3 mb-2">
                    <label for="ItemStatus" class="form-label"><strong>Order Status</strong></label>
                            <select class="form-select" aria-label="ItemStatus"  onChange={(e) => {
                                                setshippingstatus(e.target.value)
                                            }} required>
                    <option>{shippingstatus}</option>
                    {
                                        getstatus.map(function (Addtoshipping) {
                                            if (orderf.shippingstatus !== Addtoshipping)
                                            return <option key={Addtoshipping} value={Addtoshipping}>{Addtoshipping}</option>
                                        })
                                    }
                                    <option >Order Shipped</option>
                                    <option >Order Not Shipped</option>
                    </select>
                    </div><br></br>
            
             
            <center>
            <div class="inner"><button type="submit"class="btn btn-primary">Update</button></div>
            <div class="inner">
            <Link to={"/Tracking"} ><button type="submit"  className="btn btn-danger">Cancel</button></Link></div>
            </center></FadeIn>
          </form>
          </div>
          </div>
          </div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}
          </div>
    );
}

export default EditOutbound;



