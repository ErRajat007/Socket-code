const express = require('express');
const app = express();
const port = 3002
const router = require('./routes/index')
const connectDb = require('./config/db')
const bodyParser = require("body-parser");
const socket = require('socket.io');

connectDb()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.send("okk rajat")
})

app.use('/api', router)

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




const io = socket(server)

io.on('connection', (socket) => {

    console.log("socket start ");

    socket.on("creteRoom", (data) => {
        socket.join(data.roomId)
        console.log(`socket is join in room id ${data.roomId}`)
    })

    socket.on("joinRoom", (data) => {


        const room = io.sockets.adapter.rooms.get(data.roomId);
        if (room) {
            if (room.size < 2) {//2 player join kar sakte hai bas
                socket.join(data.roomId);
                console.log("room has been joined successfully")

                io.to(data.roomId).emit("RoomJoined", data.roomId);
            } else {
                io.to(data.roomId).emit("RoomFull", "room has been fulled");
                console.log("room has been full")
            }
        } else {
            console.log("wrong room Id provided")
            socket.emit('wrongRoomId', "wrong room Id provided")
        }

    })

 
    socket.on("chat",(data)=>{
       
     const checkRoom =socket.rooms.has(data.roomId)
     console.log(data.roomId)
     if(checkRoom){
     console.log("innnn a room")
    //  io.sockets.emit("receive_message", data);//sab ko message ja jata hai 
    socket.to(data.roomId).emit("receive_message", data);//room id vale me hi jata hai
     }else{
        console.log("romm erro")
     }
    })
});

