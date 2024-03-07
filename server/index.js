const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["*"],
  },
});
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

io.on("connection", (socket) => {
  socket.on("join_room", (room_id) => {
    socket.join(room_id);
  });

  socket.on("user-message", (data) => {
    socket.to(data.room_id).emit("Msg", data);
  });
});

server.listen(5005, () => {
  console.log("server started");
});
