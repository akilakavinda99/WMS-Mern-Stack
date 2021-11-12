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
  const [itemID, setitemID] = useState("")
  const [itemName, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [bdate, setBdate] = useState("")

  const [getItemId, setgetItemId] = useState([])
  const [getItemName, setgetItemName] = useState([])

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
    axios
      .get("http://localhost:8070/item//vinventoryRW")
      .then((res) => {
        if (res.data.length > 0) {
          setgetItemId(res.data.map((item) => item.itemID))
        }
      })
      .catch((e) => {
        // console.log(e);
      })

    axios
      .get("http://localhost:8070/item/vinventoryRW")
      .then((res) => {
        if (res.data.length > 0) {
          setgetItemName(res.data.map((item) => item.itemName))
        }
      })
      .catch((e) => {
        // console.log(e);
      })
  })

  function sendData(e) {
    // e.preventDefault()

    const newItem = {
      itemID,
      itemName,
      quantity,
      bdate,
    }

    swal({
      title: "Are you sure?",
      text: "The item Will Added to the system",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willadd) => {
      if (willadd) {
        axios
          .post("http://localhost:8070/Order/requestR", newItem)
          .then(() => {
            swal("Request Successfull", { icon: "success" })
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
              <div class="mb-3">
                <label for="Itemname" class="form-label">
                  <strong>Item ID</strong>
                </label>
                <select
                  class="form-select"
                  aria-label="Item Id"
                  onChange={(e) => {
                    setitemID(e.target.value)
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
                </select>
              </div>

              <div class="mb-3">
                <label for="Itemname" class="form-label">
                  <strong>Item Name</strong>
                </label>
                <select
                  class="form-select"
                  aria-label="Item Id"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  required
                >
                  <option></option>

                  {getItemName.map(function (item) {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  })}
                </select>
              </div>

              {/* <div class="mb-3">
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
              </div> */}

              <div class="mb-3">
                <label for="description" class="form-label">
                  <strong>Quantity</strong>
                </label>
                <input
                  type="string"
                  class="form-control"
                  id="quantity"
                  onChange={(e) => {
                    setQuantity(e.target.value)
                  }}
                  required
                ></input>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">
                  <strong>Before Date</strong>
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="bdate"
                  onChange={(e) => {
                    setBdate(e.target.value)
                  }}
                  required
                ></input>
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
