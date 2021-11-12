import React,{useState, useEffect} from "react";
import axios from "axios";
import Header from '../components/InboundHeaders/Header'
import './inboundcss.css';
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom';




export default function ViewQualityPassed() {

    const [PassedItem, setPassedItem] = useState([]);
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
    

    const deleteInbound=(id) =>{
        swal({
            title: "Are you sure?",
            text: "Item Is Not Available Once Deleted...",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
              if(willDelete){
        axios.delete(`http://localhost:8070/passed/delete/${id}`).then(()=>{
           
        
                if (willDelete) {
                  swal("Item Succesfully Deleted!!", {
                    icon: "success",
                  });setTimeout(function(){
                                window.location.reload();
                               },1000);}
                // } else {
                //               swal("File Is Not Deleted");
                //             } 
              }).catch((e) => {
                swal("File Is Not Deleted");
            })
    
            }
            
        //       .then((willDelete) => {
        //         if (willDelete) {
        //           swal("The file has been deleted!", 
        //             "success","success"
        //           );  setTimeout(function(){
        //             window.location.reload();
        //            },1000);
        //         } else {
        //           swal("File Is Not Deleted");
        //         }
        //       });
       
        // })
      })
    }







    useEffect(() => {
        //fetching all quality passed data from the database
        axios.get("http://localhost:8070/passed").then((res) => {
            if (res.data.length > 0) {
                setPassedItem(res.data);
            }
        }).catch((e) => {
            console.log(e);
        })

    }, [])

    return (

        <>{supplier.role === "manager"?<>
       
         <Header/><div class="headAK">
    <h1 ><strong>Quality Passed Items </strong></h1>
    
    </div>
    <div className="txtAK">
    <button type="button" class="btn btn-info">Total Items-{PassedItem.length}</button>
                    {/* <span>Total Inventory-</span> */}
                    
                </div>
                {/* <div className="num">
           <span>{failedItem.length}</span></div> */}
    <div class="num3">
    <button type="button" class="btn btn-outline-secondary">Generate PDF</button>
    </div>
        <div class="lftAK">
<div class="cardAK" >
    <br/>
<div class="content-box1" >
<div class="scroll">
    
    {/* <table class="table table-striped"> */}
    <table class="table table-striped">
         {/* <table class="table"> */}
                    <thead  class="thead-dark">
                        <tr>
                            <th >Item ID</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>BatchNo</th>
                            <th>ReceivedDate</th>
                            <th>Description</th>
                            <th>Action</th>
                          

                        </tr>
                    </thead>
                    <tbody>
                        {
                            PassedItem.map(function (f) {
                                return <tr>
                                    
                                  
                                    <td >{f.itemID}</td>
                                    <td >{f.itemName} </td>
                                    <td >{f.quantity} </td>
                                    <td >{f.batchNo} </td>
                                    <td >{f.receivedDate} </td>
                                   
                                    <td >{f.description} </td>
                                    
                                    


                                     <td >
<button class="btn btn-outline-danger"   onClick={() =>  deleteInbound(f._id)}>Delete</button>
                                        
                
         </td>

   
            

                                </tr>

                            })
                        }
                    </tbody>
                    </table>
                {/* </table>
                </table> */}
</div>
</div>
</div>
</div></>:supplier.role === "admin"?<body onload={myFunction()}/>:supplier.role === "user"?<body onload={myFunction()}/>:supplier.role === "agent"?<body onload={myFunction2()}/>:<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>}


        </>
    
    )









}