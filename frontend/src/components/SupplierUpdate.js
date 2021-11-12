import React, {useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import './AddSupplier.css'
import { useParams } from "react-router-dom";
import SupplierHeader2 from "./SupHeaders/SupplierHeader2";
import AdminHeader from './SupHeaders/AdminHeader';
import ManagerHeader from './manager/managerHeader';

export default function UpdateSupplier(){

  let history = useHistory();
  let path = '/supplier/login';
  let path2 = '/supplier/supplierprofile';
  const{ id } = useParams();

  const [supplier, setSupplier] = useState([]);
  const [name, setName] = useState("");
  const [nicno, setNicNo] = useState("");
  const [address, setAddress] = useState("");

  const [contactno, setContactNo] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [raw, setRaw] = useState("");
  const [description, setDescription] = useState("");
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
      setCompanyName(res.data.companyname)
      setRaw(res.data.raw)
      setDescription(res.data.description)
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
    const supplierupdate = {
    name,
    nicno,
    address,
    contactno,
    companyname,
    raw,
    description,
    email,
    username,}

  axios.put(`http://localhost:8070/supplier/supplierupdate/${id}`, supplierupdate).then(()=>{


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
      {!isLoaded ? <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
   
  </div>
</div>:null}</div>
{supplier.role === "admin" ?
      <AdminHeader/>:supplier.role === "manager"?<ManagerHeader/>:supplier.role==="supplier"?<SupplierHeader2/>:<div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
      </div>
    </div>}
  <div className="addsuplft">
    <div className="addsupcard">

  <div className="container ">
    <br/>
    <h2 style={{fontFamily:"Arial,Helvetica,sans-serif", fontWeight:"bold"}}>Update Supplier</h2>
    <br/>

   <form  className= "needs-validation" novalidate>
     <div className="row">

          <div className="col">
          <input required type="text" id="name" name="name" className="form-control" 
                 defaultValue={supplier.name} placeholder="Name" 
                 onChange={(e)=>{setName(e.target.value);}} required />

          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="nicno" 
             id="nicno" defaultValue={supplier.nicno}
            onChange={(e)=>{
              setNicNo(e.target.value);
            }} required></input>
          </div>
          </div>
          <br/>

          <div className="row">
          <div className="col">
            <input type="text" className="form-control" id="contactno" placeholder="contactno" 
            defaultValue={supplier.contactno}
            onChange={(e)=>{
              setContactNo(e.target.value);
            }} required/>
          </div>

          <div className="col">
            <input type="text" className="form-control" id="companyname"  placeholder="companyname" 
            defaultValue={supplier.companyname}
            onChange={(e)=>{
              setCompanyName(e.target.value);
            }} required/>
          </div>
          </div>
          <br/>
          <div className="row">
          <div className="col">
            <textarea className="form-control" rows="3" id="description"  placeholder="description" 
            defaultValue={supplier.description}
            onChange={(e)=>{
              setDescription(e.target.value);
            }} required/>
          </div>

          <div className="col">
            <textarea className="form-control" id="address" placeholder="address" 
            rows="3" 
            defaultValue={supplier.address}
            onChange={(e)=>{
              setAddress(e.target.value);
            }} required/>
          </div>
          </div>
          <br/>

          <div className="row">
          <div className="col">
            <input type="text" className="form-control" id="email" placeholder="email" 
            defaultValue={supplier.email}
            onChange={(e)=>{
              setEmail(e.target.value);
            }} required/>
          </div>

          <div className="col">
            <input type="text" className="form-control" placeholder="raw" 
            id="raw" defaultValue={supplier.raw}
            onChange={(e)=>{
              setRaw(e.target.value);
            }} required/>
          </div>
          </div>
          <br/>

          <div className="row">
          <div className="col">
            <input type="text" className="form-control" id="username"  placeholder="username" 
            defaultValue={supplier.username}
            onChange={(e)=>{setUsername(e.target.value);}} required/>
          </div>
          </div>
          <br/>

          <br/>
          
          <center><button type="submit"onClick={(e) => updateData(e)} class="btn btn-dark">Update</button></center>
        
  </form>
  <br/>
 </div>
 </div>
</div>
</>
)


}