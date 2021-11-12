import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import './AgentProfile.css';
import AgentHeader2 from './AgentHeaders/AgentHeader2';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';


const AgentProfile = props=>{

    // const [agent, setAgent] = useState([]);

    // useEffect(()=>{
    //     const fetchUser = async ()=>{
    //         const res = await axios.get('/agent/agentprofile').then((res)=>{
    //             setAgent(res.data);
    //         }).catch((err)=>{
    //             alert(err.message);
    //         })
    //     }
    //     fetchUser();
    // },[]);

    let history = useHistory();
    let path = '/supplier/login';
  
  
    
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
  },[]);


    return(
        <>
            <AgentHeader2/>
        <div >
        <div className="lft">
            <div className="card">

            <div className="container">

            <h1 style={{fontFamily:"Arial,Helvetica,sans-serif", fontWeight:"bold"}}>Hello {supplier.name}...</h1>    
            <br/>
            <Link to={"/agent/agentupdate/" + supplier._id} >

            <button type="button" className="btn btn-outline-success"> Update </button> </Link>

                <div className="border border-primary">
                    <br/>

                <table className="table" >
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{supplier.name}</td>
                        </tr>

                        <tr>
                            <td>Nic No</td>
                            <td>{supplier.nicno}</td>
                        </tr>

                        <tr>
                            <td>Address</td>
                            <td>{supplier.address}</td>
                        </tr>

                        <tr>
                            <td>Contact No</td>
                            <td>{supplier.contactno}</td>
                        </tr>

                        <tr>
                            <td>Email</td>
                            <td>{supplier.email}</td>
                        </tr>

                        <tr>
                            <td>Username</td>
                            <td>{supplier.username}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <br/>
            </div>
            </div>
        </div>
        </div>
        </>
    );
}

export default AgentProfile;