import React from "react"
import Login from "./components/Login"
import { BrowserRouter as Router, Route } from "react-router-dom"
import SupplierProfile from "./components/SupplierProfile"
import UpdateSupplier from "./components/SupplierUpdate"
import Allsupplier from "./components/AllSupplier"
import AddSupplier from "./components/Addsupplier"
import NewSupOrders from "./components/NewSupOrders"
import MySupOrders from "./components/MySupOrders"
import AcceptSupOrders from "./components/AcceptSupOrders"
import SupOrderHistory from "./components/SupOrderHistory"
import AddSupOrderHistory from "./components/AddSupOrderHistory"
import Alluser from "./components/AllUsers"
import AddLabourers from "./components/AddLabour"
import AllLabourers from "./components/ViewLabourers"
import LabourDetails from "./components/LabourDetails"
import UpdateLabour from "./components/updateLabour"
import MarkAttendance from "./components/LabourAttendance"
import SalaryReport from "./components/LabourSalary"
import ViewRequestedMaterial from "./components/viewRequestedMaterial"
import OrderRequests from "./components/OrderRequests"
import EditRequestedMaterial from "./components/EditRequestedMaterial"
import ValidateOrders from "./components/ValidateOrders"
import AcceptedOrders from "./components/AcceptedOrders"
import DeclinedOrders from "./components/DeclinedOrders"
import RawMaterialRequests from "./components/RawMaterialRequests"
import ViewRmaterial from "./components/viewRMaterial"
import SupAcceptedReqs from "./components/SupAcceptedReqs"
import Request from "./components/ReqOrder"
import AgentProfile from "./components/AgentProfile"
import AddAgent from "./components/AddAgent"
import AllAgent from "./components/AllAgent"
import EditAgent from "./components/EditAgent"
import AllOrders from "./components/AllOrders"
import InventoryRequest from "./components/InventoryRequest"
import AddtoShippingLables from "./components/AddShippingLables"
import Tracking from "./components/Tracking"
import EditOutbound from "./components/EditOutbound"
import ReturnItems from "./components/ReturnItems"
import AddtoReturn from "./components/AddtoReturn"
import Return from "./components/Return"

import Addinbound from "./components/addInbound"
import ViewInbound from "./components/viewInbound"
import EditinboundView from "./components/updateInbound"
import QualityCheck from "./components/qualityCheck"
import ViewQualityFailed from "./components/qualityFailed"
import ViewQualityPassed from "./components/qualityPassed"
import ReturnItemsInbound from "./components/returnItemsInbound"
import Addnewitemstk from "./components/Addnewitemstk"
import Inventoryview from "./components/inventoryview"
import Stkadditem from "./components/sktadditem"
import Requestliststk from "../src/components/Waitingliststk"
import Stkview from "../src/components/stkview"
import CheckAttendance from "./components/MarkAttendance"
import AttendanceReport from "./components/LabourAttendanceReport"

import Lowstock from "./components/lowstock"
import Rawmatreqest from "./components/rawmatreqest"
import Location from "./components/location"
import Editinventory from "./components/editinventoryitem"
import Chart from "./components/Userreport"
import LandingPage from "./components/landingPage"



function App() {
  return (
    <Router>
      <div>
        <Route path="/admin/alluser" component={Alluser} />
        <Route path="/supplier/getmyorder/:id" component={AddSupOrderHistory} />
        <Route path="/supplier/orderhistory" component={SupOrderHistory} />
        <Route path="/supplier/getneworder/:id" component={AcceptSupOrders} />
        <Route path="/supplier/myorders" component={MySupOrders} />
        <Route path="/supplier/allneworders" component={NewSupOrders} />
        <Route path="/supplier/register" component={AddSupplier} />
        <Route path="/supplier/onlysupplier/supplier" component={Allsupplier} />
        <Route path="/supplier/supplierupdate/:id" component={UpdateSupplier} />
        <Route path="/supplier/login" component={Login} />
        <Route path="/supplier/supplierprofile" component={SupplierProfile} />
        <Route path="/labour/view" component={AllLabourers} />
        <Route path="/labour/add" component={AddLabourers} />
        <Route path="/labour/LabourDetails/:id" component={LabourDetails} />
        <Route path="/labour/updatelabour/:id" component={UpdateLabour} />

        <Route path="/Order/orderreq" component={OrderRequests} />
        <Route path="/Order/R" component={RawMaterialRequests} />
        <Route path="/Order/viewreq" component={ViewRequestedMaterial} />
        <Route path="/Order/updatereq/:id" component={EditRequestedMaterial} />
        <Route path="/Order/getorder/:id" component={ValidateOrders} />
        <Route path="/Order/getR/:id" component={ViewRmaterial} />
        <Route path="/Order/acceptedorders" component={AcceptedOrders} />
        <Route path="/Order/declinedorders" component={DeclinedOrders} />
        <Route path="/Order/allAorders" component={SupAcceptedReqs} />
        <Route path="/agent/add" component={Request} />
        <Route path="/agent/agentprofile" component={AgentProfile} />
        <Route path="/agent/register" exact component={AddAgent} />
        <Route path="/agent/allagent" component={AllAgent} />
        <Route path="/agent/agentupdate/:id" component={EditAgent} />

        <Route path="/labour/attendance" component={MarkAttendance} />
        <Route path="/labour/salary" component={SalaryReport} />

        <Route path="/AllOrders" exact component={AllOrders} />
        <Route path="/InventoryRequest" exact component={InventoryRequest} />
        <Route path="/get/:id" exact component={AddtoShippingLables} />
        <Route path="/Tracking" exact component={Tracking} />
        <Route path="/update/:id" exact component={EditOutbound} />
        <Route path="/ReturnItems" exact component={ReturnItems} />
        <Route path="/getr/:id" exact component={AddtoReturn} />
        <Route path="/Return" exact component={Return} />

        <Route
          path="/inbound/qualitycheck/:id"
          exact
          component={QualityCheck}
        />
        <Route
          path="/inbound/returning/:id"
          exact
          component={ReturnItemsInbound}
        />
        <Route path="/inbound/add" exact component={Addinbound} />
        <Route path="/inbound/view" exact component={ViewInbound} />
        <Route
          path="/inbound/updateinbound/:id"
          exact
          component={EditinboundView}
        />
        <Route
          path="/inbound/qualityfailed"
          exact
          component={ViewQualityFailed}
        />
        <Route
          path="/inbound/qualitypassed"
          exact
          component={ViewQualityPassed}
        />

        <Route path="/item/addstk" exact component={Addnewitemstk} />
        <Route path="/itwt/wlist" exact component={Requestliststk} />
        <Route path="/item/vinventory" exact component={Inventoryview} />
        <Route path="/passed/getitem/:id" exact component={Stkadditem} />
        <Route path="/stkitem/stkallview" exact component={Stkview} />
        <Route path="/stkitem/get/:id" exact component={Editinventory} />
        <Route path="/labour/markAttendance/:id" component={CheckAttendance} />
        <Route path="/stkitem/stklawview" component={Lowstock} />
        <Route path="/Order/requestR" component={Rawmatreqest} />
        {/* <Route path="/item/location" component={Location} /> */}
        <Route path = "/labour/atandancereport" component={AttendanceReport}/>

        <Route path = "/landingpage" component={LandingPage}/>
        <Route path = "/labour/atandancereport" component={AttendanceReport}/>
        <Route path = "/manager/userchart" component={Chart}/>
      </div>




      
    </Router>
  )
}

export default App
