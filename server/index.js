var express = require('express')
const http = require("http");
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});

// const Redis = require("ioredis");
// const redis = new Redis(1000);

// redis.psubscribe("*",function(error,count){

// })

// redis.on('message',function(partner,channel,message) {
//   console.log(partner,channel,message);
//   console.log("send")
// })

socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  socket.emit("getId", socket.id);

  socket.on("clientSendData", function(data) {
    console.log(data)
    socketIo.emit("serverSendData", { data });
  })

  // socket.on("typing", function(data) {
  //   console.log(data)
  //   socketIo.emit("typingServer", { data });
  // })

  // socket.on("stopTyping", function(data) {
  //   console.log(data)
  //   socketIo.emit("stopTypingServer",{data});
  // })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(8000, () => {
    console.log('Server đang chay tren cong 8000');
});