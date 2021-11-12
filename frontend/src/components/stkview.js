import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axois from "axios"
import axios from "axios"
import "./stkmanage.css"
import swal from "sweetalert"
import jspdf from "jspdf"
import "jspdf-autotable"
import Header from "../components/StkHeaders/Header"
import {useHistory} from 'react-router-dom';

export default function Inventoryview() {
  const [Stockitems, setStockitems] = useState([])
  const [searchTerm, setsearchTerm] = useState("")

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
        axios.delete(
          `http://localhost:8070/item/stkdelete/${Stockitems.itemID}`
        )
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
    <>{supplier.role === "manager"?<>
      <Header />
      <div class="ychead" style={{ width: "100%" }}>
        <h1>
          <strong style={{ textAlign: "center" }}> Inventory List </strong>
        </h1>
      </div>
      <div className="yctxt">
        <button type="button" class="btn btn-warning">
          Total Items : {Stockitems.length}
        </button>
      </div>

      <div class="yclft">
        <i
          class="fas fa-search"
          style={{ padding: "30px" }}
          aria-hidden="true"
        ></i>
        <input
          class="form-control form-control-sm ml-3 w-75"
          type="text"
          placeholder="Search Inventory Item Here"
          aria-label="Search"
          onChange={(e) => {
            setsearchTerm(e.target.value)
          }}
        />

        <div class="ycnum4">
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => generatePDF(Stockitems)}
          >
            Generate Inventory Report
          </button>
        </div>

        <br />
        <div class="yccard">
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
                        <Link to={"/stkitem/get/" + f._id}>
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
      </div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}
    </>
  )
}
