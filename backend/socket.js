let io;

const socket = {
  connect(server) {
    io = require("socket.io")(server, {
      cors: {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      this.socket = socket;
      console.log("Client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  },

  emit(event, data) {
    if (io) {
      io.emit(event, data);
    } else {
      console.error("Socket connection not established.");
    }
  },
};

module.exports = {
  connect: socket.connect,
  emit: socket.emit,
};
