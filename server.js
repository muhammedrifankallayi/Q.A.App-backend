const express = require("express")
const app = express()
const userRouter = require("./Routes/route")
const http = require("http").createServer(app)
const cors = require("cors")
const mongoose= require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/ReactProject").then(()=>{
    console.log("mongoDbconnected");
})
app.use(cors())
app.use("/public",express.static("./public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/user',userRouter)


const server = http.listen(4500,()=>{
    console.log("port listening to 4500");
})