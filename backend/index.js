const express = require("express")
const cors = require("cors")
const socket = require("socket.io")

const app = express()

const PORT = 8000
app.use(express())
app.use(cors())

const server = app.listen(PORT,console.log("connected to the port"))

const io = socket(server)

io.on("connection",(socket)=>{
    socket.on("joinRoom",({room,name})=>{
        console.log(room)
        socket.join(room)
    })

    socket.on("clicked",({target})=>{
        console.log(target)
        io.emit("clicked",{target})
    })
})

