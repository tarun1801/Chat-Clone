/*
Steps :
1. Initialise NPM .
2.  Index Css js files . 
3. Install dependencies Express ,socket.io
4. Create an express server 
5. Front end part 
6. Set Up Socket.io in  server side and client side 
7. Client Send message logic in Client js 
8. recieve message on server and broadcast to all clients




*/
const express = require("express");
const app = express();
const http = require("http").createServer(app);

app.use(express.static('public'))
const PORT = process.env.PORT || 3000;


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})




http.listen(PORT,()=>{
    console.log("Server running on the port 3000");
})


// Socket 

const io =  require("socket.io")(http)

io.on("connection",(socket =>{
    console.log("Connected...")
    console.log("User ID "+ socket.id);
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg)
    })
}))