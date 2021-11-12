import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import "./stk.css"
import axios from "axios"
import {useHistory} from 'react-router-dom';
import swal from "sweetalert";

export default function Editinventory() {
  const { id } = useParams()
  const [itemID, setId] = useState("")
  const [itemName, setName] = useState("")
  const [itemType, setType] = useState("")
  const [mUnit, setUnit] = useState("")
  const [itemDes, setDescription] = useState("")

  const [initem, SetInitem] = useState([])
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
    e.preventDefault()

    const newItem = {
      itemID,
      itemName,
      itemType,
      mUnit,
      itemDes,
    }
    axios.put(
      `http://localhost:8070/item/updateinventoryitem/${itemID}`,
      newItem
    )
    axios
      .put(`http://localhost:8070/stkitem/updatestkitem/${itemID}`, newItem)
      .then((window.location = "/item/vinventory"))
      .catch((err) => {
        alert("error")
      })
  }

  useEffect(() => {
    //fetching the item

    axios
      .get(`http://localhost:8070/stkitem/get/${id}`)
      .then((res) => {
        SetInitem(res.data.initem)
        console.log(initem)

        setId(res.data.initem.itemID)
        setName(res.data.initem.itemName)
        setType(res.data.initem.itemType)
        setUnit(res.data.initem.mUnit)
        setDescription(res.data.initem.itemDes)
      })
      .catch((e) => {
        console.log(e)
        console.log(id)
      })
  }, [])

  return (
    <>{supplier.role === "manager"?<>
      <div class="lft">
        <div class="card">
          <div class="container">
            <h1>Edit Items</h1>
            <br></br>
            <br></br>
            {/* <form onSubmit={sendData} className="frm" novalidate> */}
            <form onSubmit={sendData} className="frm">
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
                  class="form-control"
                  readOnly="readOnly"
                  defaultValue={itemID}
                  onChange={(e) => {
                    setId(e.target.value)
                  }}
                  required
                ></input>
              </div>

              <div class="mb-3">
                <label for="Itemname" class="form-label">
                  <strong>Item Name</strong>
                </label>
                <input
                  type="string"
                  class="form-control"
                  id="name"
                  defaultValue={itemName}
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
                  defaultValue={itemType}
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                  onLoad={(e) => {
                    setType(e.target.value)
                  }}
                  required
                >
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
                  defaultValue={mUnit}
                  onChange={(e) => {
                    setUnit(e.target.value)
                  }}
                  required
                >
                  <option>KG</option>
                  <option>L</option>
                  <option>CC</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">
                  <strong>Description</strong>
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  defaultValue={itemDes}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                ></textarea>
              </div>

              <center>
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
