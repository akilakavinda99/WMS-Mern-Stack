import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import "./stk.css"
import axios from "axios"
import swal from "sweetalert"
import Header from "../components/StkHeaders/Header"
import {useHistory} from 'react-router-dom';

export default function Stkadditem() {
  const { id } = useParams()
  const [itemID, SetitemID] = useState("")
  const [itemName, SetitemName] = useState("")
  const [quantity, Setquantity] = useState("")
  const [batchNo, SetbatchNo] = useState("")
  const [description, Setdescription] = useState("")
  const [receivedDate, SetreceivedDate] = useState("")
  let history = useHistory();
  let path = '/supplier/login';
  let path2 = '/supplier/supplierprofile';
  let path3 = '/agent/agentprofile';

  const [supplier, setSupplier] = useState([]);

  const [passeditems, Setpasseditems] = useState([])

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


  function sendData(e) {
    // e.preventDefault()

    const newItem = {
      itemID,
      itemName,
      quantity,
      batchNo,
      description,
      receivedDate,
    }
    swal({
      title: "Are you sure?",
      text: "The item Will Added to the system",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willadd) => {
      if (willadd) {
        axios.put(`http://localhost:8070/stkitem/updatestk/${itemID}`, newItem)
        axios.post("http://localhost:8070/stkitemh/stkiteminh/", newItem)
        console.log(newItem)
        // alert("Item Added")
        axios
          .delete(`http://localhost:8070/passed/delete/${id}`)
          .then(() => {
            window.location = "/itwt/wlist"
          })
          .then(() => {
            swal("Item is added to the System!", { icon: "success" })
          })
          .catch((err) => {
            swal("File Is Not Added")
            // console.log(newItem)
            alert(err)
          })
      }
      setTimeout(function () {
        window.location.reload()
      }, 1000)
    })
  }

  useEffect(() => {
    //fetching the inbounditem object that matching with the ID from the DB
    axios
      .get(`http://localhost:8070/passed/getitem/${id}`)
      .then((res) => {
        Setpasseditems(res.data.passeditems)
        console.log(passeditems)
        console.log(passeditems.itemID)

        SetitemID(res.data.passeditems.itemID)
        SetitemName(res.data.passeditems.itemName)
        Setquantity(res.data.passeditems.quantity)
        SetbatchNo(res.data.passeditems.batchNo)
        SetreceivedDate(res.data.passeditems.receivedDate)
      })
      .catch((e) => {
        console.log(e)
        console.log(id)
      })
  }, [])

  return (
    <>{supplier.role === "manager"?<>

      <Header />
      <h1>fsdlkfjsdfllfdjs</h1>
      <div class="lft">
        <div class="card">
          <div class="container">
            <form className="frm" novalidate>
              <div class="mb-3">
                <label for="Itemname" class="form-label">
                  <strong>Item Name</strong>
                </label>
                <select
                  class="form-select"
                  aria-label="Item Name"
                  onChange={(e) => {
                    SetitemName(e.target.value)
                  }}
                  required
                >
                  <option selected>{itemName}</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="Itemname" class="form-label">
                  <strong>Item ID</strong>
                </label>
                <select
                  class="form-select"
                  aria-label="Item Id"
                  onChange={(e) => {
                    SetitemID(e.target.value)
                  }}
                  required
                >
                  <option selected>{itemID}</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="Itemname" class="form-label">
                  <strong>Quantity</strong>
                </label>
                <input
                  id="quantity"
                  type="text"
                  readOnly="readonly"
                  class="form-control"
                  defaultValue={quantity}
                  onChange={(e) => {
                    Setquantity(e.target.value)
                  }}
                  required
                ></input>
              </div>

              <div class="mb-3">
                <label for="Itemname" class="form-label">
                  <strong>BatchNo</strong>
                </label>
                <input
                  type="string"
                  readOnly="readonly"
                  class="form-control"
                  id="batchNo"
                  defaultValue={batchNo}
                  onChange={(e) => {
                    SetbatchNo(e.target.value)
                  }}
                  required
                ></input>
              </div>

              <div class="mb-3">
                <label for="Itemname" class="form-label">
                  <strong>Date</strong>
                </label>
                <input
                  id="receiveddate"
                  type="text"
                  readOnly="readonly"
                  class="form-control"
                  defaultValue={receivedDate}
                  onChange={(e) => {
                    Setquantity(e.target.value)
                  }}
                  required
                ></input>
              </div>

              <div class="mb-3">
                <label for="receivedDate" class="form-label">
                  <strong>description</strong>
                </label>
                <input
                  type="string"
                  class="form-control"
                  id="receivedDate"
                  onChange={(e) => {
                    Setdescription(e.target.value)
                  }}
                  required
                ></input>
              </div>

              <center>
                <button
                  type="button"
                  onClick={() => sendData()}
                  class="btn btn-success"
                >
                  Accept
                </button>
              </center>
              {/* <br></br>
              <center>
                <button
                  type="button"
                  onClick={() => qualityFailed()}
                  class="btn btn-danger"
                >
                  Quality Failed
                </button>
              </center> */}
            </form>
          </div>
        </div>
      </div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}
    </>
  )
}
