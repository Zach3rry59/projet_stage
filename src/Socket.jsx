import socketIOClient from "socket.io-client";
const BASE_URL = "http://localhost:3002";
const socket = socketIOClient(BASE_URL);

export default socket;
