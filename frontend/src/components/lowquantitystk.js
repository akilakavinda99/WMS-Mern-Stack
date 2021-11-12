import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axois from "axios"
import axios from "axios"
import "./stkmanage.css"
import swal from "sweetalert"
import jspdf from "jspdf"
import "jspdf-autotable"
import Header from "../components/StkHeaders/Header"

export default function Inventoryview() {
  const [Stockitems, setStockitems] = useState([])
  const [searchTerm, setsearchTerm] = useState("")

  useEffect(() => {
    function getinventory() {
      axios
        .get("http://localhost:8070/stkitem/stkallview")
        .then((res) => {
          console.log(res)
          if (res.data.length > 0) {
            setStockitems(res.data)
          }
        })
        .catch((err) => console.log.apply(err))
    }
    getinventory()
  }, [])

  const deleteitem = (id) => {
    swal({
      title: "Are you sure?",
      text: "The item Will be removed from System",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:8070/item/stkdelete/${id}`)
        axios
          .delete(`http://localhost:8070/stkitem/stkdelete/${id}`)
          .then(() => {
            if (willDelete) {
              swal("The file has been deleted!", { icon: "success" })
              setTimeout(function () {
                window.location.reload()
              }, 1000)
            } else {
              swal("File Is Not Deleted")
            }
          })
      }
    })
  }

  //generate PDF
  const generatePDF = (tickets) => {
    const doc = new jspdf()
    const tableColumn = ["Item Id", "Item Name"]
    const tableRows = []

    tickets.map((ticket) => {
      const ticketData = [ticket.itemID, ticket.itemName]
      tableRows.push(ticketData)
    })
    doc.text("Inventory Report", 14, 15).setFontSize(12)
    const date = Date().split(" ")
    const dateStr = date[1] + "-" + date[2] + "-" + date[3]
    // right down width height
    // doc.addImage(img, "JPEG", 170, 8, 25, 15)
    doc.autoTable(tableColumn, tableRows, {
      styles: { fontSize: 8 },
      startY: 35,
    })
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23)
    doc.save(`Inventory_report_.pdf`)
  }

  return (
    <>
      <Header />
      <div class="head">
        <h1>
          <strong style={{ textAlign: "center" }}> Inventory List </strong>
        </h1>
      </div>
      <div className="txt">
        <button type="button" class="btn btn-info">
          Total Items - {Stockitems.length}
        </button>
        <i
          class="fas fa-search"
          style={{ padding: "30px" }}
          aria-hidden="true"
        ></i>
        <input
          class="form-control form-control-sm ml-3 w-75"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            setsearchTerm(e.target.value)
          }}
        />
        {/* <span>Total Inventory-</span> */}
      </div>

      {/* <div className="num">
        <span>{failedItem.length}</span>
      </div> */}
      <div class="num3">
        <button
          type="button"
          class="btn btn-outline-secondary"
          onClick={() => generatePDF(Stockitems)}
        >
          Generate PDF
        </button>
      </div>
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
                  <th>Edit</th>
                  <th>Delete</th>
                  {/* <th>Quantity</th>
                  <th>BatchNo</th>
                  <th>Description</th> */}
                </tr>
              </thead>
              <tbody>
                {Stockitems.filter((val) => {
                  if (searchTerm === "") {
                    return val
                  } else if (
                    val.itemID
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    val.itemName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return val
                  }
                }).map(function (f) {
                  return (
                    <tr>
                      <td>{f.itemID}</td>
                      <td>{f.itemName} </td>
                      <td> {f.quantity}</td>
                      <td>
                        <Link to={"/item/updateinventoryitem/" + f._id}>
                          <button class="btn btn-success">Edit</button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteitem(f._id)}
                          class="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                      {/* <td>{f.quantity} </td>
                      <td>{f.batchNo} </td>
                      <td>{f.description} </td> */}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
