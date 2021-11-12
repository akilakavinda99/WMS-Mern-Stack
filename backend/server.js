const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()
require("dotenv").config()
const cookieParser = require("cookie-parser")

const PORT = process.env.PORT || 8070

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())

const URL = process.env.MONGODB_URL

mongoose.connect(URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const connection = mongoose.connection

connection.once("open", () => {
  console.log("mongodb connection success!")
})

//Yasith routes
const itemRouter = require("./routes/items.js")
app.use("/item", itemRouter)

// const itwtRouter = require("./routes/itmwaiting.js")
// app.use("/itwt", itwtRouter)

const stkiteminRouter = require("./routes/stock.js")
app.use("/stkitem", stkiteminRouter)

const stkhistoryRouter = require("./routes/stkhistory.js")
app.use("/stkitemh", stkhistoryRouter)

const supplierRouter = require("./routes/supplier")
app.use("/supplier", supplierRouter)

const newsupordersRouter = require("./routes/newsuporders")
app.use("/supplier", newsupordersRouter)

const mysupordersRouter = require("./routes/mysuporders")
app.use("/supplier", mysupordersRouter)

const suporderhistoryRouter = require("./routes/suporderhistory")
app.use("/supplier", suporderhistoryRouter)

//akilas routes
const inboundRouter = require("./routes/inboundadd.js")
app.use("/inbound", inboundRouter)

const qualityFailed = require("./routes/qualityf.js")
app.use("/failed", qualityFailed)

const qualityPassed = require("./routes/qualityp.js")
app.use("/passed", qualityPassed)

const returnItems = require("./routes/returnitems.js")
app.use("/return", returnItems)

//amila routes
const orderRouter = require("./routes/orders.js")
app.use("/order", orderRouter)

const addtoshippingRouter = require("./routes/addtoshippings.js")
app.use("/addtoshipping", addtoshippingRouter)

const addtoreturnRouter = require("./routes/addtoreturns.js")
app.use("/addtoreturn", addtoreturnRouter)

const requestRouter = require("./routes/requests.js")
app.use("/request", requestRouter)

//pankaja routes
const requestmaterialRouter = require("./routes/requestmaterials.js")
app.use("/Order", requestmaterialRouter)

const orderrequestRouter = require("./routes/orderrequests.js")
app.use("/Order", orderrequestRouter)

const acceptedorderRouter = require("./routes/acceptedorders.js")
app.use("/Order", acceptedorderRouter)

const declineedorderRouter = require("./routes/declinedorders.js")
app.use("/Order", declineedorderRouter)

const rawmaterialreqRouter = require("./routes/rawmaterialreqs.js")
app.use("/Order", rawmaterialreqRouter)

const stockitemRouter = require("./routes/stockitems.js")
app.use("/Order", stockitemRouter)

//thushal routes
const labourRouter = require("./routes/labourers.js")
app.use("/labour", labourRouter)

const attendanceRouter = require("./routes/attendance");
app.use("/labour",attendanceRouter);

const presentRouter = require("./routes/labourpresent");
app.use("/labour",presentRouter);

const absentRouter = require("./routes/labourabsent");
app.use("/labour",absentRouter);

//Vinuka routes
const agentRouter = require("./routes/agent")
app.use("/agent", agentRouter)

const RequestorderRouter = require("./routes/agentReqOrder")
app.use("/req", RequestorderRouter)

const AgentitemRouter = require("./routes/Agentitem")
app.use("/item", AgentitemRouter)

app.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`)
})
