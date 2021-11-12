import React,{useState,useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import './AddSupplier.css';
import AdminHeader from "./SupHeaders/AdminHeader";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
const eye = <FontAwesomeIcon icon={faEye} />;

export default function AddSupplier(){

  const [passwordShown, setPasswordShown] = useState(false);

  const { register, handleSubmit, formState: { errors }} = useForm();

  let history = useHistory();
  let path = '/supplier/login';
  let path2 = '/supplier/supplierprofile';
  let path3 = '/agent/agentprofile';

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

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
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  function myFunction(){
    history.push(path2);
      swal({title: "unauthorized",
      text: "Your not an admin",
      icon: "warning"} ); 
  }

  function myFunction2(){
    history.push(path3);
      swal({title: "unauthorized",
      text: "Your not an admin",
      icon: "warning"} ); 
  }


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
  },[]);

  function sendData(e){
   
    // e.preventDefault();
    
    const newSupplier ={

      name,
      nicno,
      address,
      contactno,
      companyname,
      raw,
      description,
      email,
      username,
      password,
      role
    }

    axios.post("http://localhost:8070/supplier/register",newSupplier).then(()=>{
     // refresh()
      swal({
      title: "Success!",
      text: "Supplier Successfully registered",
      icon: "success",
      button: "Ok",
    });setTimeout(function(){
      window.location.reload();
     },2500);
    }).catch(()=>{
      swal("Please fill Form correctly");
    })


  };

  return(
    <>
    <div>{supplier.role === "admin"?
    
    
    
      <><AdminHeader />
      <div className="addsuplft">
          <div className="addsupcard">

            <div className="container">
              <br />
              <center><h2 style={{ fontFamily: "Arial,Helvetica,sans-serif", fontWeight: "bold" }}>New Supplier Registration</h2></center>
              <br />
            
              <form onSubmit={handleSubmit(sendData)} className= "needs-validation" novalidate>
                <div className="dasupscroll">
                <div className="row g-2">
                  <div className="col-md-6">
                    <input type="text" className="form-control" {...register("suppliername", { maxLength: 20 })} id="supliername" placeholder="Supplier Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      } } required/>
                      {errors?.suppliername?.type === "maxLength" && (<p className="damrureq">*Supplier Name cannot exceed 20 characters</p> )}
                  </div>

                  <div className="col-md-6">
                    <input type="text" {...register("nicno", { minLength: 10 })} className="form-control" id="nicno" placeholder="Supplier NIC"
                      onChange={(e) => {
                        setNicNo(e.target.value);
                      } } required/>
                      {errors?.nicno?.type === "minLength" && (<p className="damrureq">*Nic no must contain minimum 10 numbers </p> )}
                  </div>
                </div>
                <br />

                <div className="row g-2">
                  <div className="col-md-6">
                    <input type="text" className="form-control" {...register("contactno", { minLength:10, maxLength:12 })} id="" placeholder="Supplier Contact No"
                      onChange={(e) => {
                        setContactNo(e.target.value);
                      } } required />
                      {/* {errors.contactno && (<p>*Contact No must be contain Min 10 numbers</p>)} */}
                      {errors?.contactno?.type === "minLength" && (<p className="damrureq">*Contact No must be contain Min 10 numbers</p>)}
                      {errors?.contactno?.type === "maxLength" && (<p className="damrureq">*Contact No must be contain Max 12 numbers</p>)}
                  </div>

                  <div className="col-md-6">
                    <input type="text" className="form-control" id="companyname" placeholder="Supplier Company Name"
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                      } } required />
                  </div>
                </div>
                <br />
                <div className="row g-2">
                  <div className="col-md-6">
                    <textarea className="form-control" rows="3" id="description" placeholder="Supplier Description "
                      onChange={(e) => {
                        setDescription(e.target.value);
                      } } required />
                  </div>

                  <div className="col-md-6">
                    <textarea className="form-control" id="address" rows="3" placeholder="Supplier Address"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      } } required/>
                  </div>
                </div>
                <br />

                <div className="row g-2">
                  <div className="col-md-6">
                    <input type="text" className="form-control" {...register("email",{ pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/})} id="email" placeholder="Enter Supplier Email Address"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      } } required/>
                      {errors.email && (<p className="damrureq">*email format is Incorrect</p> )}
                  </div>

                  <div className="col-md-6">
                    <input type="text" className="form-control" id="raw" placeholder="Supplier Raw Matarial"
                      onChange={(e) => {
                        setRaw(e.target.value);
                      } } required/>
                  </div>
                </div>
                <br />

                <div className="row g-2">
                  <div className="col-md-6">
                    <input type="text" className="form-control" {...register("username", { minLength: 6, maxLength: 15 })} id="" placeholder="Enter Username "
                      onChange={(e) => {
                        setUsername(e.target.value);
                      } } required/>
                      {/* {errors.username && (<p>*Username must be minimum 6 letters and maximum 15 letters </p>)} */}
                      {errors?.username?.type=== "minLength" && (<p className="damrureq">*Username must be minimum 6 letters</p>)}
                      {errors?.username?.type=== "maxLength" && (<p className="damrureq">*Username must be maximum 15 letters</p>)}

                  </div>
                      <div className="pswid">
                  <div className="input-group col-md-6">
                    <input type={passwordShown ? "text" : "password"} {...register("password", { minLength: 8})} className="form-control" id="" placeholder="Enter Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      } } required />
                      <span class="input-group-text" id="basic-addon2"><i className="eye1" onClick={togglePasswordVisiblity}>{eye}</i></span>
                      
                      {/* <button class="btn bg-white text-muted"> <span class="far fa-eye-slash"></span> </button> */}
                      {errors?.password?.type === "minLength" && (<p className="damrureq">*Password must contain minimum 8 characters </p> )}
                    </div>
                  </div>
                </div>
                <br />

                <div className="col-md-6">
                  <input type="text" className="form-control" id="" placeholder="Enter role "
                    onChange={(e) => {
                      setRole(e.target.value);
                    } } required/>
                </div>
                <br />
                </div>
                <button type="submit" className="btn btn-success" id="regsubmit">Submit</button>
                <button type="reset" className="btn btn-danger" id="regreset">Reset</button>

              </form>
              
              <br />
            </div>
          </div>
        </div></>:supplier.role === "manager"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
      </div>
    </div>}

</div>
</>
  )
}