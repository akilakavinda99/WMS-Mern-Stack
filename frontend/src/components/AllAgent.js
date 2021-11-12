import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './AllAgent.css';
import swal from 'sweetalert';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import jspdf from 'jspdf'
import "jspdf-autotable"
import img from './logo.png';
import { Link } from 'react-router-dom'
import {useHistory} from 'react-router-dom';
import ManagerHeader from './manager/managerHeader';




export default function AllAgent(){

    let history = useHistory();
    let path = '/agent/agentprofile';
    const [searchTerm, setsearchTerm] = useState("");
    const [supplier, setSupplier] = useState([]);
    const deleteAgent=(id) =>{
        axios.delete(`http://localhost:8070/agent/agentdelete/${id}`).then(()=>{
            swal({
                title: "Are You Sure?",
                text: "The agent will be removed from system",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete)=>{
                if (willDelete) {
                    swal("The file has been deleted!",
                       "success",
                );  setTimeout(function(){
                    window.location.reload();
                },1000);

                } else {
                    swal("File Is Not Deleted");}
                    window.location.reload(false);
                });
                })
            
            }
           

            useEffect(()=>{
                const getAgent = async()=>{
                    const res = await axios.get('/supplier/onlysupplier/agent').then((res)=>{
                        setSupplier(res.data);
                    }).catch(()=>{
                        history.push(path);
                        swal({title: "Unauthorized",
                        text: "Your not an Manager",
                        icon: "warning"} ); 
                    })
                }
                getAgent();
            }, [])

            

            const generatePDF = tickets => {

                const doc = new jspdf();
                const tableColumn = ["Agent Name", "NIC No", "Contact Number", "Email"];
                const tableRows = [];
            
                tickets.map(ticket => {
                    const ticketData = [
                        ticket.name,
                        ticket.nicno,
                        ticket.contactno,
                        ticket.email
                        
                       
                    ];
                    tableRows.push(ticketData);
                })
                doc.text("All Agent Report", 14, 15).setFontSize(12);
                // right down width height
                doc.addImage(img, 'JPEG', 190, 5, 15, 15);
                doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
                doc.save(`All_Agent_Report`);
              };

            return(

                <>
                 <ManagerHeader/>
                <div className="head">

            <div className="lft">
                <div className="card">
                <h1>All Agents</h1>
                <br/>
                <i class="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
        <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Agents by Name, Nic no, Contact no, Email" aria-label="Search"
        
        onChange={(e) => {
            setsearchTerm(e.target.value)
        }}/>
                <div className="button">
                    
                    <button type="button" onClick={() => generatePDF(supplier)}class="btn btn-secondary btn-sm">Genarate Report</button>


                </div>
                <br/><br/>
                        
                          <table className="table table-bordered" >
                          <table class="table table-hover" >
                              <thead>

                                <tr>
                                    <th>Name</th>
                                    <th>Nic No</th>
                                    <th>Contact No</th>
                                    <th>Email</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                                  supplier.filter(val=>{
                                      if(searchTerm === ''){
                                          return val;
                                      } else if(
                                          val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                                          val.nicno.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                                          val.email.toLowerCase().includes(searchTerm.toLocaleLowerCase()) 
                                        //   val.contactno.includes(searchTerm) ||
                                        //   val._id.includes(searchTerm)
                                      ){
                                          return val;
                                      }
                               
                       
                            
                                    }).map((supplier,key)=>(

                                <tr key={key}>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.nicno}</td>
                                    <td>{supplier.contactno}</td>
                                    <td>{supplier.email}</td>

                                    <td > <IconButton aria-label="delete" onClick={() => deleteAgent(supplier._id)}>
                                          <DeleteIcon fontSize="small" />
                                          </IconButton></td>

                                          

                                          

                                </tr>
                                
                                ))}
                        
                         
                                </tbody>
                        

                                                  
                                                        
                              
                          </table>
                          </table>
           </div>
           </div>
           </div>
           </>
                        
                        );
                        
                                }