import React, { useState, useEffect, useRef } from "react";
import VideoContext from "./VideoContext";
// import { io } from "socket.io-client";
import Peer from "simple-peer";
import { message } from "antd";

// const URL = "https://fathomless-tundra-67025.herokuapp.com/";
const URL = "http://localhost:8000/";

export const socket = io(URL);

const VideoState = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const screenTrackRef = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
      socket.on("endCall", () => {
        window.location.reload();
      });
      socket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
        if (currentMediaStatus !== null || currentMediaStatus !== []) {
          switch (type) {
            case "video":
              setUserVdoStatus(currentMediaStatus);
              break;
            case "mic":
              setUserMicStatus(currentMediaStatus);
              break;
            default:
              setUserMicStatus(currentMediaStatus[0]);
              setUserVdoStatus(currentMediaStatus[1]);
              break;
          }
        }
      });
      socket.on("callUser", ({ from, name: callerName, signal }) => {
        setCall({ isReceivingCall: true, from, name: callerName, signal });
      });
    });
}