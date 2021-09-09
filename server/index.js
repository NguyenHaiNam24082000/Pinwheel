var express = require('express')
const http = require("http");
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
  });


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