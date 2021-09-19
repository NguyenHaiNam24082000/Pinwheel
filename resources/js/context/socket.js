import React from 'react';
import socketIOClient from "socket.io-client";
const host = "http://localhost:8000";

export const socket = socketIOClient.connect(host);
export const SocketContext = React.createContext();