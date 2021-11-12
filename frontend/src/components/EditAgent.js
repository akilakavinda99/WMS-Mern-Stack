import React,{ useState, useEffect } from "react";
import './EditAgent.css';
import axios from 'axios';
import { useParams } from "react-router-dom"; 
import swal from "sweetalert";
import { useHistory } from "react-router-dom";


export default function EditAgent(){

    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/agent/agentprofile';
    const{ id } = useParams();

    const [supplier, setSupplier] = useState([]);
    const [name, setName] = useState("");
    const [nicno, setNicNo] = useState("");
    const [address, setAddress] = useState("");
  
    const [contactno, setContactNo] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
        setIsLoaded(true);
        const fetchUser = async ()=>{
          const res = await axios.get('/supplier/supplierprofile').then((res)=>{
          setSupplier(res.data)
          setName(res.data.name)
          setNicNo(res.data.nicno)
          setAddress(res.data.address)
          setContactNo(res.data.contactno)
          setEmail(res.data.email)
          setUsername(res.data.username)
          }).catch(()=>{
            history.push(path);
            swal({title: "unauthorized",
            text: "Please Login First",
            icon: "warning"} ); 
        })
      }
        fetchUser();
      },[]);

    function updateData(e) {
        e.preventDefault();
    if(e!=null){
        const agentupdate = {
        name,
        nicno,
        address,
        contactno,
        email,
        username,}
    
      axios.put(`http://localhost:8070/supplier/supplierupdate/${id}`, agentupdate).then(()=>{
    
    
        swal({          
      title: "Success!",
      text: "Profile Successfully Updated",
      icon: "success",
      button: "Ok",
    });history.push(path2);
        }).catch(()=>{
           swal("Please fill Form correctly");
          })}else{
            swal("Please fill Form correctly");
          }
      
    };


return(
<>
<div>
    <div className="lft">
        <div className="addcard">
            <div className="container"></div>


   <center><h2 className="h2-head">Update Agent Details</h2></center>

    <form  className= "needs-validation" novalidate>
     <div className="row">

         
              
                  <label for="name" className="form-label">Agent Name</label>
          <input required type="text" id="name"  className="form-control" 
                 defaultValue={supplier.name} 
                 onChange={(e)=>{setName(e.target.value);}} readOnly />

          
          
          

            <label for="nicno" className="form-label">NIC No</label>
            <input type="text" className="form-control" id="nicno"
            defaultValue={supplier.nicno}
            onChange={(e)=>{
                setNicNo(e.target.value);
            }} readOnly></input>
            
        
        
        <br/>

     
           
                <label for="address" className="form-label">Address</label>
            <textarea className="form-control" id="address"
            defaultValue={supplier.address}
            onChange={(e)=>{
                setAddress(e.target.value);
            }} required/>
        
      
        <br/>

        
            
                <label for="contno" className="form-label">Contact Number</label>
            <input type="text" className="form-control" id="contactno" 
            defaultValue={supplier.contactno}
            onChange={(e)=>{
                setContactNo(e.target.value);
            }} required/>
            
        
        <br/>

        
            
                <label for="email" className="form-label">Email</label>
                <input type="text" className="form-control" id="email"
                defaultValue={supplier.email}
                onChange={(e)=>{
                    setEmail(e.target.value);
                }} required/>
      
        <br/>

        
            
                <label for="username" className="form-label">User Name</label>
                <input type="text" className="form-control" id="username" 
                defaultValue={supplier.username}
                onChange={(e)=>{
                    setUsername(e.target.value);
                }} required/>
            
               
        
        <br/>
      
        
        <center><button type="submit" onClick={(e) => updateData(e)} class="btn btn-dark">Update</button></center>

        
        </div>
       </form>
       </div>
    </div>
</div>
       
       </>
       
       
    
        
        
 
        )
        }



