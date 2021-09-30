var express = require('express')
const http = require("http");
const { io } = require('socket.io-client');
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

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
  socket.on("addUser",(userId)=>{
      addUser(userId, socket.id);
      socketIo.emit("getUsers",users);
  });

  socket.on("clientSendData", function(data) {
    const user = getUser()
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