import React, { useEffect, useState } from "react";
import axios from "axios";
import './AddAgent.css';
import AgentHeader from "./AgentHeaders/AgentHeader";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import AdminHeader from "./SupHeaders/AdminHeader";


export default function AddAgent(){

    // const [passwordShown, setPasswordShown] = useState(false);

    let history = useHistory();
    let path = '/supplier/login';
    let path2 = '/supplier/supplierprofile';
    let path3 = '/agent/agentprofile';
    const { register, handleSubmit, formState: { errors }} = useForm();
     
    const [supplier, setSupplier] = useState([]);
    const [name, setName] = useState("");
    const [nicno, setNicNo] = useState("");
    const [address, setAddress] = useState("");

    const [contactno, setContactNo] = useState("");
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
        // swal({
        //     title: "Success!",
        //     text: "Agent Successgully Registered",
        //     icon: "success",
        //     buttons: "Ok",
        // });
        // e.preventDefault();

        const newAgent ={
            
            name,
            nicno,
            address,
            contactno,
            email,
            username,
            password,
            role
        }

        axios.post("http://localhost:8070/supplier/Aregister",newAgent).then(()=>{
            // refresh()
        swal({
            title: "Success!",
            text: "Agent Successfully registerd",
            icon: "success",
            button: "Ok",
        });setTimeout(function(){
            window.location.reload();
        },2500);
        }).catch((err)=>{
            swal("Please fill form correctly" +err);
        })

    };
    // const refresh = () =>{
    //     window.location.reload(false);
    // };

    return(
        <>
        <div>{supplier.role === "admin"?
          
         <> <AdminHeader/>
        <div className="lft">
            <div className="card">

        <div className="container">
            <br/>
            <h2 style={{fontFamily:"Arial,Helvetica,sans-serif", fontWeight:"bold"}}>New Agent Registration</h2>
            <br/>

            <form onSubmit={handleSubmit(sendData)}>
                <div className="row">
                    <div className="col">
                        <label for="name" className="form-label">Agent Name</label>
                        <input Type="text" className="form-control"id="name" {...register("agentname", { required:true})}  placeholder="Enter Agent Name" 

                        
                        onChange={(e)=>{
                            setName(e.target.value);

                            
                        }}/>
                        
                        {errors.agentname && (<p className="requied-warn">*requied agent name</p>)}
                        </div>

                <div className="col">
                    <label for="nic" className="form-label">NIC No</label>
                    <input type="text" className="form-control" id="nic" {...register("nicno", { required:true })} placeholder="Enter NIC number"
                    onChange={(e)=>{
                        setNicNo(e.target.value);
                    }}/>
                    {errors.nicno && (<p className="requied-warn">*requied NIC no</p>)}
                    </div>
                    </div>
                    <br/>

                <div className="row">
                    <div className="col">
                        <label for="contno" className="form-label">Contact Number</label>
                        <input Type="text" className="form-control" id="contno" {...register ("contactno", { minLength:10, maxLength:12 })} placeholder="Enter Contact No"
                        onChange={(e)=>{
                            setContactNo(e.target.value);
                        }}/>
                                   {errors?.contactno?.type === "minLength" && (<p>*Contact No must be contain Min 10 numbers</p>)}
                      {errors?.contactno?.type === "maxLength" && (<p>*Contact No must be contain Max 12 numbers</p>)}
                  

                </div>
                </div>
                <br/>

                <div className="col">
                <label for="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" {...register("address", { required:true})} placeholder="Enter address"
                    onChange={(e)=>{
                        setAddress(e.target.value);
                    }}/>
                     {errors.address && (<p className="requied-warn">*requied address</p>)}
                </div>
                <br/>

                <div className="col">
                    <div className="col">
                    <label for="address" className="form-label">Email</label>
                        <input type="text" className="form-control" {...register("email",{ pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/})}   id="" placeholder="Enter Agent Email Address"
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}/>
                        {errors.email && (<p>*email format is Incorrect</p> )}
                </div>
                </div>
                <br/>

                <div className="row">
                    <div className="col">
                    <label for="address" className="form-label">User Name</label>
                        <input type="text" className="form-control" {...register("username", { minLength: 6, maxLength: 15 })} id="" placeholder="Enter Username"
                        onChange={(e)=>{
                            setUsername(e.target.value);
                        }}/>
                                              {errors?.username?.type=== "minLength" && (<p>*Username must be minimum 6 letters</p>)}
                      {errors?.username?.type=== "maxLength" && (<p>*Username must be maximum 15 letters</p>)}
                    </div>
                </div>
                <br/>

                <div className="col">
                <label for="address" className="form-label">Password</label>
                    <input type="password" {...register("password", { minLength: 8})} className="form-control" id="" placeholder="Enter Password"
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}/>
                                          {/* <span class="input-group-text" id="basic-addon2"><i className="eye1" onClick={togglepasswordVisibility}>{eye}</i></span> */}
                                          {errors?.password?.type === "minLength" && (<p>*Password must contain minimum 8 characters </p> )}
                </div>
                <br/>

                <div className="col">
                <label for="address" className="form-label">Role</label>
                    <input type="text" className="form-control" id="" placeholder="Enter Role"
                    onChange={(e)=>{
                        setRole(e.target.value);
                    }}/>
                </div>
                <br/>

                <button type="submit" className="btn btn-success" id="regsubmit" >Submit</button>
                <button type="reset" className="btn btn-danger" id="regreset">Reset</button>
            </form>
            <br/>
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





