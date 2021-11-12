import { red } from "@material-ui/core/colors"
import React, { useState, useEffect } from "react"
import "./stk.css"
import axios from "axios"
import { useForm } from "react-hook-form"
import swal from "sweetalert"
import Header from "../components/StkHeaders/Header"
import {useHistory} from 'react-router-dom';

export default function Addnewitemstk() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [itemID, setId] = useState("")
  const [itemName, setName] = useState("")
  const [itemType, setType] = useState("")
  const [mUnit, setUnit] = useState("")
  const [itemDes, setDescription] = useState("")
  const quantity = 0
  let batchNo = null

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

  function sendData(e) {
    // e.preventDefault()

    const newItem = {
      itemID,
      itemName,
      itemType,
      mUnit,
      itemDes,
    }

    const newStkitem = {
      itemID,
      itemName,
      quantity,
      batchNo,
      itemDes,
    }
    newStkitem.quantity = 0
    newStkitem.batchNo = null

    swal({
      title: "Are you sure?",
      text: "The item Will Added to the system",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willadd) => {
      if (willadd) {
        axios.post("http://localhost:8070/stkitem/stkitemin", newStkitem)
        console.log(newStkitem)
        axios
          .post("http://localhost:8070/item/addstk/", newItem)
          .then(() => {
            swal("Item is added to the System!", { icon: "success" })
            // console.log(newItem)
            // alert("Item Added")
          })
          .catch((err) => {
            // console.log(newItem)
            // alert(err)
            swal("File Is Not Added")
          })
      }
      setTimeout(function () {
        window.location.reload()
      }, 1000)
    })
  }

  return (
    <>{supplier.role === "manager"?<>
      <Header />
      <div class="lft">
        <div class="card">
          <div class="container">
            <div class="card-header">
              <h1>Add New Items to System</h1>
            </div>
            <br></br>
            <br></br>
            {/* <form onSubmit={sendData} className="frm" novalidate> */}
            <form onSubmit={handleSubmit(sendData)} className="frm">
              {/* <div class="mb-3">
                <label for="Itemname" class="form-label">
                  <strong>Item ID</strong>
                </label> */}
              {/* <select
                  class="form-select"
                  aria-label="Item Id"
                  onChange={(e) => {
                    SetitemID(e.target.value)
                  }}
                  required
                >
                  <option></option>

                  {getItemId.map(function (item) {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  })}
                </select> */}
              {/* </div> */}

              <div class="mb-3">
                <label for="ItemID" class="form-label">
                  <strong>Item ID</strong>
                </label>
                <input
                  id="id"
                  type="text"
                  {...register("id", { maxLength: 5, minLenght: 5 })}
                  class="form-control"
                  onChange={(e) => {
                    setId(e.target.value)
                  }}
                  required
                />
                {errors.id && <p>*length should be 5</p>}
              </div>

              <div class="mb-3">
                <label for="Itemname" class="form-label">
                  <strong>Item Name</strong>
                </label>
                <input
                  type="string"
                  class="form-control"
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  required
                ></input>
              </div>

              <div class="mb-3">
                <label
                  for="Itemname"
                  class="form-label"
                  data-intro="Hello step one!"
                >
                  <strong>Item Type</strong>
                </label>
                <select
                  class="form-select"
                  aria-label="Item Type"
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                  required
                >
                  <option value="" disable selected>
                    Select Item Type
                  </option>
                  <option>Raw Material</option>
                  <option>Product</option>
                </select>
              </div>

              <div class="mb-3">
                <label
                  for="Itemname"
                  class="form-label"
                  data-intro="Hello step one!"
                >
                  <strong>Messuring Unit</strong>
                </label>
                <select
                  class="form-select"
                  aria-label="Item Type"
                  onChange={(e) => {
                    setUnit(e.target.value)
                  }}
                  required
                >
                  <option value="" disable selected>
                    Select Messuring Unit
                  </option>
                  <option value="KG">KG</option>
                  <option value="L">L</option>
                  <option value="Piece">Piece</option>
                  <option value="CC">CC</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">
                  <strong>Description</strong>
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  required
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                >
                  {errors.id && <p>*Description is required</p>}
                </textarea>
              </div>

              <center>
                <button
                  type="reset"
                  class="btn btn-light"
                  id="addstkreset"
                  style={{ marginRight: 100 }}
                >
                  Reset
                </button>
                <button type="submit" class="btn btn-dark">
                  Submit
                </button>
              </center>
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
