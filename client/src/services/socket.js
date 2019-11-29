import socketIO from "socket.io-client";

const connectToServer = () => {
  return socketIO("http://localhost:5000");
};

export { connectToServer };
