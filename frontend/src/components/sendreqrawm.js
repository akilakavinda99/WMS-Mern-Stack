import React, { useState, useEffect } from "react"
import axios from "axios"
import Header from "./Header"
import "./inboundcss.css"

import "intro.js/introjs.css"
import swal from "sweetalert"

export default function Addinbound() {
  const [itemID, SetitemID] = useState("")
  const [itemName, SetitemName] = useState("")
  const [quantity, Setquantity] = useState("")
  const [batchNo, SetbatchNo] = useState("")
  const [receivedTime, SetreceivedTime] = useState("")
  const [receivedDate, SetreceivedDate] = useState("")

  const [getItemId, setgetItemId] = useState([])
  const [getItemName, setgetItemName] = useState([])

  useEffect(() => {
    // getting data from item database for displaying in the selection
    axios
      .get("http://localhost:8070/item/")
      .then((res) => {
        if (res.data.length > 0) {
          setgetItemId(res.data.map((item) => item.itemID))
        }
      })
      .catch((e) => {
        // console.log(e);
      })

    axios
      .get("http://localhost:8070/item/")
      .then((res) => {
        if (res.data.length > 0) {
          setgetItemName(res.data.map((item) => item.itemName))
        }
      })
      .catch((e) => {
        // console.log(e);
      })
  })

  //function for sending data to the database
  function sendData(e) {
    e.preventDefault()

    const newInboundItem = {
      itemName,
      itemID,
      quantity,
      batchNo,
      receivedTime,
      receivedDate,
    }

    axios
      .post("http://localhost:8070/inbound/add", newInboundItem)
      .then(() => {
        swal("Success")
      })
      .catch((e) => {
        alert("error")
      })
  }

  return (
    <>
      <Header />
      <div class="lft">
        <div class="card">
          <div class="container">
            <form onSubmit={sendData} className="frm" novalidate>
              <div class="mb-3">
                <label
                  for="Itemname"
                  class="form-label"
                  data-intro="Hello step one!"
                >
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
                  <strong>Quantity</strong>
                </label>
                <input
                  id="quantity"
                  type="text"
                  class="form-control"
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
                  class="form-control"
                  id="batchNo"
                  onChange={(e) => {
                    SetbatchNo(e.target.value)
                  }}
                  required
                ></input>
              </div>

              <div class="mb-3">
                <label for="receivedTime" class="form-label">
                  <strong>Recieved Time</strong>
                </label>
                <input
                  type="time"
                  class="form-control"
                  id="receivedTime"
                  onChange={(e) => {
                    SetreceivedTime(e.target.value)
                  }}
                  required
                ></input>
              </div>

              <div class="mb-3">
                <label for="receivedDate" class="form-label">
                  <strong>Recieved Date</strong>
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="receivedDate"
                  onChange={(e) => {
                    SetreceivedDate(e.target.value)
                  }}
                  required
                ></input>
              </div>

              <center>
                <button type="submit" class="btn btn-dark">
                  Submit
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
