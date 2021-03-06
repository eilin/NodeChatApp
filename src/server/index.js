const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {wsEngine: "ws"});
const path = require("path");


app.use(express.static(path.join(__dirname, "./../../")));

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, "./../../index.html"));
});

io.on('connection', function (socket) {
  console.log("new client connected", socket.handshake.address);
  socket.on("send_message", (data) => {
    console.log("Broadcasting message: " + data.message);
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});

