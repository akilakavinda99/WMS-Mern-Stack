import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axois from "axios"
import axios from "axios"
import {useHistory} from 'react-router-dom';
import "./stkmanage.css"
import Header from "../components/StkHeaders/Header"
import swal from "sweetalert";

export default function Waitinglistsk() {
  const [PassedItem, setPassedItem] = useState([])
  let history = useHistory();
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
    function getitem() {
      axios
        .get("http://localhost:8070/passed/")
        .then((res) => {
          console.log(res)
          if (res.data.length > 0) {
            setPassedItem(res.data)
          }
        })
        .catch((err) => console.log.apply(err))
    }
    getitem()
  }, [])

  // function acceptItem(e) {
  //   const newStockItems = {
  //     itemID,
  //     itemName,
  //     quantity,
  //     batchNo,
  //     description,
  //   }

  //   axios
  //     .post("http://localhost:8070/", newStockItems)
  //     .then(() => {
  //       alert("Confirm")
  //     })
  //     .catch((e) => {
  //       alert("error")
  //     })
  // }

  return (
    <>{supplier.role === "manager"?<>
      <Header />
      <div class="head">
        <h1>
          <strong style={{ textAlign: "center" }}> Item Waiting List </strong>
        </h1>
      </div>
      <div className="txt">
        <button type="button" class="btn btn-info">
          Total Items-{PassedItem.length}
        </button>
        {/* <span>Total Inventory-</span> */}
      </div>
      {/* <div className="num">
           <span>{failedItem.length}</span></div> */}
      {/* <div class="num3">
        <button type="button" class="btn btn-outline-secondary">
          Generate PDF
        </button>
      </div> */}
      <div class="lft">
        <div class="card">
          <br />
          <div class="content-box1">
            {/* <table class="table table-striped"> */}
            <table class="table table-striped">
              {/* <table class="table"> */}
              <thead class="thead-dark">
                <tr>
                  <th>Item ID</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>BatchNo</th>
                  <th>Description</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {PassedItem.map(function (f) {
                  return (
                    <tr>
                      <td>{f.itemID}</td>
                      <td>{f.itemName} </td>
                      <td>{f.quantity} </td>
                      <td>{f.batchNo} </td>
                      <td>{f.description} </td>
                      <td>{f.receivedDate}</td>
                      <td>
                        <center>
                          <Link to={"/passed/getitem/" + f._id}>
                            <button type="button" class="btn btn-success">
                              Accept
                            </button>
                          </Link>
                        </center>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}
    </>
  )
}
