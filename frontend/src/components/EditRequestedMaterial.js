import React, {useState, useEffect} from "react";
import './Order.css';
import OrderHeader from "./OrderHeaders/OrderHeader";
import axios from "axios";
import { useParams} from "react-router-dom"
import swal from 'sweetalert';
import {useHistory} from "react-router-dom";




    const EditRequestedMaterial = () => {
    
    let history = useHistory();
    let path = '/supplier/login';    
    const {id} = useParams();

    const [_id, Set_id] = useState("")
    const [itemName, SetMaterialName] = useState("");
    const [quantity, Setquantity] = useState("");
    const [requestdate, SetrequestDate] = useState("");
    const [bdate, SetbeforeDate] = useState("");
    const [supplier, setSupplier] = useState([]);

    const [requestedmaterial,setRequestedMaterial] = useState([]);

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
        
        axios.get(`http://localhost:8070/Order/getreq/${id}`).then((res) => {
            
                setRequestedMaterial(res.data.requestedmaterial)

                Set_id(res.data.requestedmaterial._id)
                SetMaterialName(res.data.requestedmaterial.itemName)
                Setquantity(res.data.requestedmaterial.quantity)
                SetrequestDate(res.data.requestedmaterial.requestdate)
                SetbeforeDate(res.data.requestedmaterial.bdate)
            
        }).catch((e) => {
            console.log(e);
            console.log(id);
        })

    },[])

        function updateData(e) {
            e.preventDefault();

            const newRequestedMaterial = {
                itemName,quantity,requestdate,bdate
            }

            axios.put(`http://localhost:8070/Order/updatereq/${id}`, newRequestedMaterial).then(()=>{
                window.location = "/Order/viewreq"
            }).catch((e)=>{
                alert("error");
            })
        }


        return(
            <>
            <OrderHeader />
            <div className="vlft">
            <div className="vcard" >

             <div className= "container">
    
                <h3><center>Edit Requested Material</center></h3>
                <br></br>
                
                <form  className="frm" onSubmit={updateData} novalidate>
                <div className="form-group">

                    <label for="requestID" className="form-label"><strong>Request ID</strong></label>
                    <input id="requestID" readOnly="readonly" defaultValue={requestedmaterial._id} type="text" className="form-control" 
                    onChange={(e) => {

                        Set_id(e.target.value)
                        }}/>


                    </div>
                    <br></br>
    
                    <div className="form-group">

                    <label for="RawMaterialname" className="form-label"><strong>Raw Material Name</strong></label>
                    <input type="text" defaultValue={requestedmaterial.itemName} id="MaterialName"  className="form-control" 
                     onChange={(e) => {

                        SetMaterialName(e.target.value)
                        }}required />

 
                    </div>
                    <br></br>
    
                    <div className="form-group">
    
                    <label for="quantity" className="form-label"><strong>Quantity</strong></label>
                    <input type="text" defaultValue={requestedmaterial.quantity} id="quantity" className="form-control"
                    onChange ={(e)=>{
    
                        Setquantity(e.target.value);
    
                    }}required/>
    
                    </div>
                    <br></br>
    
                    <div className="form-group">
    
                    <label for="requestdate" className="form-label"><strong>Request Date</strong></label>
                    <input type="text" defaultValue={requestedmaterial.requestdate} id="requestdate" className="form-control"
                    onChange ={(e)=>{
    
                        SetrequestDate(e.target.value);
    
                    }}required/>
    
                    </div>
                    <br></br>
    
                    <div className="form-group">
    
                    <label for="beforedate" className="form-label"><strong>Before Date</strong></label>
                    <input type="text" defaultValue={requestedmaterial.bdate}  id="beforedate" className="form-control"  
                    onChange ={(e)=>{
    
                        SetbeforeDate(e.target.value);
    
                    }}required/>
    
                    </div>
                    <br></br>
                    <center><button type="submit" class="btn btn-primary btn-lg">Update</button></center>
    
                </form>
    
                </div>
                </div>
                </div>
                </>


        )

} 
 

export default EditRequestedMaterial;