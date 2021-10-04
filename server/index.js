var express = require("express");
const http = require("http");
const { io } = require("socket.io-client");
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
let users = {};

const addUser = (user, socketId) => {
    users[socketId]=user ;
};

const removeUser = (socketId) => {
    delete users[socketId];
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
    console.log("New client connected " + socket.id);

    // socket.on("online", (user) => {
    //     addUser(user, socket.id);
    //     console.log(user.id)
    //     socketIo.emit("getUsers", users);
    // });

    socket.on("joinConversation",(data) => {
        addUser(data,socket.id)
        const user = users[socket.id];
        socket.room= user.selectedConversationId.toString();
        socket.join(user.selectedConversationId.toString());
    })

    socket.on("clientSendData", function (data) {
        const user = users[socket.id];
        data={
            ...user,
            ...data
        }
        socketIo.sockets.emit("serverSendLastData",{data});
        socketIo.sockets.in(socket.room).emit("serverSendData", { data });
    });

    socket.on("focusInput",()=>{
        const user = users[socket.id];
        // const s=`${user.name} is typing`;
        const s="Typing";
        socket.broadcast.emit("serverFocusTyping",socket.room);
        socket.to(socket.room).emit("serverFocusInput",s);
    });

    socket.on("blurInput",()=>{
        socket.broadcast.emit("serverBlurTyping");
        socket.to(socket.room).emit("serverBlurInput");
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("serverBlurTyping");
        socket.to(socket.room).emit("serverBlurInput");
        removeUser(socket.id)
        console.log("Client disconnected");
    });
});

server.listen(8000, () => {
    console.log("Server đang chay tren cong 8000");
});
