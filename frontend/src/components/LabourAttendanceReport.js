import React, { useState } from "react";
import axios from "axios";
import LabourHeader from "./LabourHeaders/LabourHeader";
import jspdf from "jspdf";
import "jspdf-autotable"
import img from './logo.png';
import './AttandanceReport.css';


export default function AttendanceReport(){

    const [date, setDate] = useState([]);
    const [attendance, setAttendance ] = useState([]);
    //const Date = {date}
    function viewLabourers(){

        //console.log(date);

        axios.get(`http://localhost:8070/labour/attendanceview/present/${date}`).then((res)=>{
            setAttendance(res.data);
        console.log(res);
    }).catch((err)=>{
        alert(err.message);
    })

    }

    function absentLabourers(){

        axios.get(`http://localhost:8070/labour/attendanceview/absent/${date}`).then((res)=>{
            setAttendance(res.data);
        console.log(res);
    }).catch((err)=>{
        alert(err.message);
    })
    }

     //generate PDF
const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Date", "Name", "Reg No", "Job Type"];
    const tableRows = [];
    
  
    tickets.map(ticket => {
        const ticketData = [
            ticket.currentDate,
            ticket.name,
            ticket.regNo,
            ticket.jobType            
        ];
        tableRows.push(ticketData);
    })
    doc.text("Labourers Attendance Report", 14, 15).setFontSize(12);
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];
      
  
  
    // right down width height
    doc.addImage(img, 'JPEG', 170, 8, 25, 15);
    doc.autoTable(tableColumn, tableRows,  { styles: { fontSize: 8, }, startY: 35, theme:'grid' });
    
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    doc.save(`Labour_Attendance_report_.pdf`);

    
  };


return (
    <div><LabourHeader/>
    <div className="head">
        <div className="left left-labour-view">
          <div className="card-view">
            <div className="container">
                    <div>
                        <center><h2 className="title-report">Attendance Report</h2></center>
                    </div>

                    <div class="row">
                        <div class="column column-attendance-date-input">
                            <input type="date" className="form-control" onChange= {(e)=> {
                    setDate(e.target.value);}}/>
                        </div>                                 
                    
                        <div class="column column-report-attendance-present">
                            <button onClick={(e) => viewLabourers(e)} type="button" className="btn btn-outline-success" >Present List</button>
                        </div>

                        <div class="column column-report-attendance-absent">
                            <button onClick={(e) => absentLabourers(e)} type="button" className="btn btn-outline-danger" >Absent List</button>
                        </div>

                        <div class="column column-report-generate-attendance">
                            <button onClick={() => generatePDF(attendance)} type="button" className="btn btn-outline-info" >Genarate Report</button>
                        </div>

                    </div>

                    <table className="table table-bordered attendance-table">
                        <thead>
                            <tr>
                            <th className="table-head-align" scope="col">Date</th>               
                            <th className="table-head-align" scope="col">Name</th>                 
                            <th className="table-head-align" scope="col">Reg No</th>
                            <th className="table-head-align" scope="col">Job Type</th>
                            </tr>
                        </thead>
                            <tbody>
                                {
                                attendance.map(function (f){

                                return <tr>
                                
                                <td className="table-data-text">{f.currentDate}</td>
                                <td className="table-data-text">{f.name}</td>
                                <td className="table-data-text">{f.regNo}</td>
                                <td className="table-data-text">{f.jobType}</td>

                                </tr>
                                })
                            } 
                            </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
    </div>
)

}